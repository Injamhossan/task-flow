import dbConnect from "@/lib/dbConnect";
import Withdrawal from "@/models/Withdrawal";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

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
    const { id, action } = await request.json(); // id, action='approve'
    await dbConnect();

    const withdrawal = await Withdrawal.findById(id);

    if (action === "approve") {
      withdrawal.status = "approved";
      await withdrawal.save();

      // Notify Worker
      await Notification.create({
        message: `Your withdrawal request for $${withdrawal.withdrawal_amount} has been approved by admin`,
        toEmail: withdrawal.worker_email,
        actionRoute: "/dashboard/withdrawals", // Or wallet
        time: new Date()
      });
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
     return NextResponse.json({ message: "Server Error" }, { status: 500 });  
  }
}
