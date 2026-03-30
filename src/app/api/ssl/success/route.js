import dbConnect from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req) {
  try {
    const url = new URL(req.url);
    const tran_id = url.searchParams.get("tran_id");
    
    // SSLCommerz sends data in the POST body as form data
    const formData = await req.formData();
    const user_email = formData.get("value_a") || url.searchParams.get("email");
    const amount = Number(formData.get("value_b") || url.searchParams.get("amount"));
    const coins = Number(formData.get("value_c") || url.searchParams.get("coins"));
    const status = formData.get("status");

    if (status !== "VALID") {
      return NextResponse.redirect(new URL("/dashboard/purchase-coin?status=fail", req.url));
    }

    await dbConnect();

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ transactionId: tran_id });
    
    if (!existingPayment) {
        // 1. Save usage
        await Payment.create({
            user_email,
            amount: amount,
            coins: coins,
            transactionId: tran_id
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
              <p>Thank you for your purchase via SSLCommerz.</p>
              <p><strong>Amount:</strong> ৳${amount}</p>
              <p><strong>Coins Received:</strong> ${coins}</p>
              <p><strong>Transaction ID:</strong> ${tran_id}</p>
              <p>Your new balance has been updated.</p>
              <br/>
              <p>Regards,<br/>The TaskFlow Team</p>
            </div>
          `
        });
    }

    // Redirect to frontend dashboard success page
    const redirectUrl = new URL("/dashboard/purchase-coin?status=success", req.url);
    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    console.error("SSL Success Error:", error);
    return NextResponse.redirect(new URL("/dashboard/purchase-coin?status=error", req.url), 303);
  }
}
