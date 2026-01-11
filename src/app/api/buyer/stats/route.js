
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
    const totalTasks = await Task.countDocuments({ buyer_email: email });

    const tasks = await Task.find({ buyer_email: email });
    const pendingTaskCount = tasks.reduce((sum, task) => sum + (task.required_workers || 0), 0);

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
