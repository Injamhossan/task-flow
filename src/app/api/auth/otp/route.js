import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import otpGenerator from "otp-generator";

export async function POST(request) {
  try {
    const { email } = await request.json();
    await dbConnect();

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    await mongoose.connection.db.collection("otps").deleteMany({ email });

    const result = await mongoose.connection.db.collection("otps").insertOne({
        email,
        otp,
        createdAt: new Date()
    });

    console.log("OTP Generated and stored in 'otps' collection:", otp, "for", email, "InsertId:", result.insertedId);

    // 3. Send Email
    await sendEmail({
      to: email,
      subject: "Verify Your Email - TaskFlow",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #000000; padding: 40px 0; width: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #333333; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
            <!-- Header -->
            <div style="padding: 30px; border-bottom: 1px solid #222222; text-align: center; background: radial-gradient(circle at center, #1a1a1a 0%, #111111 100%);">
              <span style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 3px; font-family: 'Helvetica Neue', sans-serif;">TASK<span style="color: #bfff00;">FLOW</span></span>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #ffffff; margin-top: 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Authentication Required</h2>
              <p style="color: #888888; font-size: 15px; line-height: 1.6; margin: 20px 0 30px;">
                You are initiating a login or verification request. Please use the secure code below to complete the process.
              </p>
              
              <!-- OTP Box -->
              <div style="background-color: #050505; border: 1px solid #333333; border-left: 4px solid #bfff00; border-radius: 4px; padding: 25px; display: inline-block; margin-bottom: 30px;">
                 <span style="display: block; color: #555555; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Secure Code</span>
                 <span style="font-size: 36px; fontWeight: bold; color: #ffffff; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 0 0 10px rgba(191, 255, 0, 0.3);">${otp}</span>
              </div>

              <div style="margin-top: 20px; border-top: 1px solid #222222; padding-top: 20px; text-align: center;">
                  <p style="color: #444444; font-size: 12px; margin: 0;">
                    This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this message.
                  </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #080808; padding: 20px; text-align: center; border-top: 1px solid #222222;">
              <p style="color: #333333; font-size: 10px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">&copy; ${new Date().getFullYear()} TaskFlow Platform. All Systems Operational.</p>
            </div>
          </div>
        </div>
      `
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending OTP" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const email = body.email?.trim();
    const otp = body.otp?.trim();

    console.log("Verifying OTP for:", email, "Input:", otp);
    await dbConnect();

    // 1. Find OTP in OTP Collection (Direct DB)
    const otpRecord = await mongoose.connection.db.collection("otps").findOne({ email, otp });

    if (!otpRecord) {
        return NextResponse.json({ message: "Invalid or Expired OTP" }, { status: 400 });
    }

    const now = new Date();
    const otpTime = new Date(otpRecord.createdAt);
    const diff = (now - otpTime) / 1000 / 60;

    if (diff > 10) {
         return NextResponse.json({ message: "OTP Expired" }, { status: 400 });
    }

    const updateResult = await mongoose.connection.db.collection("users").updateOne(
        { email },
        { $set: { verified: true } }
    );

    if (updateResult.matchedCount === 0) {
        return NextResponse.json({ message: "User account not found" }, { status: 404 });
    }

    // 3. Cleanup used OTP
    await mongoose.connection.db.collection("otps").deleteOne({ _id: otpRecord._id });

    return NextResponse.json({ message: "Email Verified Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error verifying OTP" }, { status: 500 });
  }
}
