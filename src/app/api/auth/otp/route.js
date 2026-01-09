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

    // 1. Delete any existing otp for this email prompt (Direct DB)
    await mongoose.connection.db.collection("otp").deleteMany({ email });

    // 2. Create new OTP entry (Direct DB)
    const result = await mongoose.connection.db.collection("otp").insertOne({
        email,
        otp,
        createdAt: new Date()
    });

    console.log("OTP Generated and stored in 'otp' collection:", otp, "for", email, "InsertId:", result.insertedId);

    // 3. Send Email
    await sendEmail({
      to: email,
      subject: "Verify Your Email - TaskFlow",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h2 style="color: #000;">Email Verification</h2>
          <p>Use the code below to verify your account.</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; background: #eee; padding: 10px; display: inline-block; border-radius: 8px;">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
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
    const otpRecord = await mongoose.connection.db.collection("otp").findOne({ email, otp });

    if (!otpRecord) {
        return NextResponse.json({ message: "Invalid or Expired OTP" }, { status: 400 });
    }

    // Check Expiry (10 mins) manually in code since we are skipping Mongoose Schema validation
    const now = new Date();
    const otpTime = new Date(otpRecord.createdAt);
    const diff = (now - otpTime) / 1000 / 60; // difference in minutes

    if (diff > 10) {
         return NextResponse.json({ message: "OTP Expired" }, { status: 400 });
    }

    // 2. If valid, update User status (Direct DB to be safe)
    const updateResult = await mongoose.connection.db.collection("users").updateOne(
        { email },
        { $set: { verified: true } }
    );

    if (updateResult.matchedCount === 0) {
        return NextResponse.json({ message: "User account not found" }, { status: 404 });
    }

    // 3. Cleanup used OTP
    await mongoose.connection.db.collection("otp").deleteOne({ _id: otpRecord._id });

    return NextResponse.json({ message: "Email Verified Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error verifying OTP" }, { status: 500 });
  }
}
