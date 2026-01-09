
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
     return NextResponse.json({ message: "Email required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const payments = await Payment.find({ user_email: email }).sort({ createdAt: -1 });
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching payments" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { user_email, amount, coins, transactionId } = await request.json();
    await dbConnect();

    // 1. Save usage
    const newPayment = await Payment.create({
        user_email,
        amount,
        coins,
        transactionId
    });

    // 2. Increase User Coins
    await User.findOneAndUpdate(
        { email: user_email },
        { $inc: { coin: coins } }
    );

    // 3. Create Notification
    await Notification.create({
        message: `Payment Successful! You have purchased ${coins} coins.`,
        toEmail: user_email,
        actionRoute: "/dashboard/payment-history"
    });

    // 4. Send Email Notification
    await sendEmail({
      to: user_email,
      subject: "Payment Confirmed - TaskFlow",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Coins Received:</strong> ${coins}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p>Your new balance has been updated.</p>
          <br/>
          <p>Regards,<br/>The TaskFlow Team</p>
        </div>
      `
    });

    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
