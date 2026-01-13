import dbConnect from "@/lib/dbConnect";
import Withdrawal from "@/models/Withdrawal";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET(request) {
  try {
    await dbConnect();
    const withdrawals = await Withdrawal.find({}).sort({ createdAt: -1 });
    return NextResponse.json(withdrawals);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();

    // Verify User Coins Again
    const user = await User.findOne({ email: body.worker_email });
    if (!user || user.coin < body.withdrawal_coin) {
      return NextResponse.json({ message: "Insufficient coins" }, { status: 400 });
    }

    // Create Withdrawal
    const withdrawal = await Withdrawal.create({
      ...body,
      status: "pending",
    });

    // Notify Admin
    await Notification.create({
      message: `New withdrawal request from ${body.worker_name} for $${body.withdrawal_amount}`,
      toEmail: "admin@taskflow.com",
      actionRoute: "/dashboard/admin-withdrawals",
      time: new Date()
    });

    // Optionally Deduct Coins immediately or Hold them.
    // Assuming immediate deduction for better UX (coins gone, money pending)
    await User.findOneAndUpdate(
      { email: body.worker_email },
      { $inc: { coin: -body.withdrawal_coin } }
    );

    return NextResponse.json(withdrawal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, action } = await request.json(); // id, action='approve' | 'reject'
    await dbConnect();

    const withdrawal = await Withdrawal.findById(id);

    if (!withdrawal) {
      return NextResponse.json({ message: "Withdrawal not found" }, { status: 404 });
    }

    if (withdrawal.status !== 'pending') {
        return NextResponse.json({ message: "Request already processed" }, { status: 400 });
    }

    if (action === "approve") {
      withdrawal.status = "approved";
      await withdrawal.save();

      // Notify Worker
      await Notification.create({
        message: `Your withdrawal request for $${withdrawal.withdrawal_amount} has been approved.`,
        toEmail: withdrawal.worker_email,
        actionRoute: "/dashboard/worker-home",
        time: new Date()
      });

    } else if (action === "reject") {
        withdrawal.status = "rejected";
        await withdrawal.save();

        // Refund Coins
        await User.findOneAndUpdate(
            { email: withdrawal.worker_email },
            { $inc: { coin: withdrawal.withdrawal_coin } }
        );

        // Notify Worker
        await Notification.create({
            message: `Your withdrawal request for $${withdrawal.withdrawal_amount} was rejected. Coins have been refunded.`,
            toEmail: withdrawal.worker_email,
            actionRoute: "/dashboard/worker-home",
            time: new Date()
        });
    }

    return NextResponse.json({ message: "Success", withdrawal });
  } catch (error) {
     console.error(error);
     return NextResponse.json({ message: "Server Error" }, { status: 500 });  
  }
}
