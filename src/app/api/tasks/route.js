
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { 
    task_title, 
    task_detail, 
    required_workers, 
    payable_amount, 
    completion_date, 
    submission_info, 
    task_image_url,
    buyer_email,
    buyer_name
  } = body;

  try {
    await dbConnect();

    // Validate User and Coin Balance
    const user = await User.findOne({ email: buyer_email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const totalCost = required_workers * payable_amount;
    if (user.coin < totalCost) {
      return NextResponse.json({ message: "Not enough coins. Please purchase more." }, { status: 402 });
    }

    // Create Task
    // Check user balance (Get fresh data)
    const buyer = await User.findOne({ email: buyer_email });
    if (!buyer) {
        return NextResponse.json({ message: "Buyer not found" }, { status: 404 });
    }

    if (buyer.coin < totalCost) {
        return NextResponse.json({ message: "Not available Coin. Purchase Coin" }, { status: 400 });
    }

    // Create Task
    const newTask = new Task({
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
      task_image_url,
      buyer_email,
      buyer_name,
    });
    
    await newTask.save();

    // Reduce Buyer's Coins
    buyer.coin -= totalCost;
    await buyer.save();

    // Notify Buyer
    await Notification.create({
        message: `Task Created Successfully: ${task_title}`,
        toEmail: buyer_email,
        actionRoute: "/dashboard/my-tasks"
    });

    return NextResponse.json({ message: "Task created successfully", task: newTask }, { status: 201 });

  } catch (error) {
    console.error("Task Creation Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await dbConnect();
    const task = await Task.findById(id);
    if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Refill logic
    // We assume uncompleted tasks = required_workers (per requirement: "Increase the coin for unCompleted tasks". 
    // And "required_workers" field in my schema decrements as slots fill? 
    // Actually typically required_workers is static capacity. We should check if we track 'remaining'.
    // In my schema I used 'required_workers' as the capacity. 
    // Usually a 'workers_joined' or similar field tracks usage. 
    // If I haven't implemented decrement logic elsewhere, then 'required_workers' might just be the full capacity.
    // The requirement says: "Calculate refill amount ( required_workers * payable_amount )". 
    // This implies we refund for the *remaining* slots. 
    // For now, let's assume 'required_workers' is the current available slots (i.e. we decrement it when someone is approved? or we just trust the requirement literally).
    // Let's stick to the requirement literally: refund = required_workers * payable_amount.
    
    const refundAmount = task.required_workers * task.payable_amount;

    // Refund User
    await User.findOneAndUpdate(
        { email: task.buyer_email },
        { $inc: { coin: refundAmount } }
    );

    // Delete Task
    await Task.findByIdAndDelete(id);

    return NextResponse.json({ message: "Task deleted and coins refilled" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, task_title, task_detail, submission_info } = await request.json();
    await dbConnect();

    await Task.findByIdAndUpdate(id, {
        task_title,
        task_detail,
        submission_info
    });

    return NextResponse.json({ message: "Task updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    await dbConnect();
    
    let tasks;
    if (email) {
      // If email is provided, fetch tasks for that specific buyer (My Tasks)
      tasks = await Task.find({ buyer_email: email }).sort({ createdAt: -1 });
    } else {
      // Otherwise fetch all tasks with quantity > 0 (for Workers)
      tasks = await Task.find({ required_workers: { $gt: 0 } }).sort({ createdAt: -1 });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
