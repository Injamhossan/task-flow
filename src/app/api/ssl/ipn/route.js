import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Notification from "@/models/Notification";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const status = formData.get("status");
    const tran_id = formData.get("tran_id");
    const user_email = formData.get("value_a");
    const amount = Number(formData.get("value_b"));
    const coins = Number(formData.get("value_c"));

    if (status === "VALID") {
      await dbConnect();
      const existingPayment = await Payment.findOne({ transactionId: tran_id });
      
      if (!existingPayment && user_email && coins) {
          // Fallback if success route didn't pick it up
          await Payment.create({
              user_email,
              amount: amount,
              coins: coins,
              transactionId: tran_id
          });

          await User.findOneAndUpdate(
              { email: user_email },
              { $inc: { coin: coins } }
          );

          await Notification.create({
              message: `Payment Successful! You have purchased ${coins} coins.`,
              toEmail: user_email,
              actionRoute: "/dashboard/payment-history"
          });
      }
    }

    return NextResponse.json({ message: "IPN Received" }, { status: 200 });
  } catch (error) {
    console.error("SSL IPN Error:", error);
    return NextResponse.json({ message: "IPN Error" }, { status: 500 });
  }
}
