
import dbConnect from "@/lib/dbConnect";
import Submission from "@/models/Submission";
import User from "@/models/User";
import Task from "@/models/Task";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const buyer_email = searchParams.get("buyer_email");

  try {
    await dbConnect();
    // Use proper filter object
    const query = buyer_email ? { buyer_email, status: "pending" } : {};
    const submissions = await Submission.find(query);
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching submissions" }, { status: 500 });
  }
}

// Optional: Endpoint to create a notification (e.g. triggered by other actions)
// ... (POST logic for notifications is separate, here we are in submissions route)

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();

    // 1. Create Submission
    const newSubmission = await Submission.create(body);

    // 3. Notify Buyer
    await Notification.create({
      message: `${body.worker_name} has submitted task: ${body.task_title}`,
      toEmail: body.buyer_email,
      actionRoute: "/dashboard/my-tasks" 
    });

    return NextResponse.json({ message: "Submission successful", submission: newSubmission }, { status: 201 });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, action } = await request.json(); // action: "approve" or "reject"
    await dbConnect();

    const submission = await Submission.findById(id);
    if (!submission) {
      return NextResponse.json({ message: "Submission not found" }, { status: 404 });
    }

    if (submission.status !== "pending") {
       return NextResponse.json({ message: "Submission already processed" }, { status: 400 });
    }

    if (action === "approve") {
      // 1. Update Status
      submission.status = "approved";
      await submission.save();

      // 2. Increase Worker Coin
      await User.findOneAndUpdate(
        { email: submission.worker_email },
        { $inc: { coin: submission.payable_amount } }
      );

      // 3. Notify Worker
      await Notification.create({
        message: `you have earned ${submission.payable_amount} from ${submission.buyer_name} for completing ${submission.task_title}`,
        toEmail: submission.worker_email,
        actionRoute: "/dashboard/my-work",
        time: new Date()
      });

      // Email Worker
      await sendEmail({
        to: submission.worker_email,
        subject: "Task Approved! You earned money",
        html: `
          <h3>Congratulation!</h3>
          <p>Your submission for <strong>${submission.task_title}</strong> has been approved by ${submission.buyer_name}.</p>
          <p>You have earned <strong>${submission.payable_amount} coins</strong>.</p>
        `
      });

    } else if (action === "reject") {
      // 1. Update Status
      submission.status = "rejected";
      await submission.save();

      // 2. Increase required_workers in Task (Refill slot)
      await Task.findByIdAndUpdate(submission.task_id, {
        $inc: { required_workers: 1 }
      });
      
      // 3. Notify Worker
       await Notification.create({
        message: `Your submission for ${submission.task_title} was rejected by ${submission.buyer_name}`,
        toEmail: submission.worker_email,
        actionRoute: "/dashboard/my-work",
        time: new Date()
      });

      // Email Worker
      await sendEmail({
        to: submission.worker_email,
        subject: "Task Submission Rejected",
        html: `
          <h3>Submission Rejected</h3>
          <p>Unfortunately, your submission for <strong>${submission.task_title}</strong> was rejected by ${submission.buyer_name}.</p>
          <p>Please check the task requirements and try again on other available tasks.</p>
        `
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
