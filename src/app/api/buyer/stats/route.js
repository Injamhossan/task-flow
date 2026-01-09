
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import Submission from "@/models/Submission";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email required" }, { status: 400 });
  }

  try {
    await dbConnect();

    // 1. Total Task Count
    const totalTasks = await Task.countDocuments({ buyer_email: email });

    // 2. Pending Task (Sum of required_workers of HIS added tasks)
    // "pending Task( sum of all required_workers count of his added Tasks)"
    // The user phrasing is a bit ambiguous: "pending Task" usually means submissions, but "sum of required_workers" implies remaining slots.
    // I will interpret this as "Total Worker Slots Pending to be Filled" -> sum of required_workers
    const tasks = await Task.find({ buyer_email: email });
    const pendingTaskCount = tasks.reduce((sum, task) => sum + (task.required_workers || 0), 0);

    // 3. Total Payment Paid (Sum of payments by this user)
    const payments = await Payment.find({ user_email: email });
    const totalPayment = payments.reduce((sum, pay) => sum + (pay.amount || 0), 0);

    return NextResponse.json({
      totalTasks,
      pendingTaskCount,
      totalPayment
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching buyer stats:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
