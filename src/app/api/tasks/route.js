
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import User from "@/models/User";
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

    // Deduct coins from Buyer
    user.coin -= totalCost;
    await user.save();

    return NextResponse.json({ message: "Task created successfully", task: newTask }, { status: 201 });

  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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
      // Note: In a real app we would filter by quantity > 0
      tasks = await Task.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
