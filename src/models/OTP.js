import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // 10 Minutes TTL (Time To Live) - auto delete after 10 mins
  },
});

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
