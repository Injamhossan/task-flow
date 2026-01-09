
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photoURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ["worker", "admin", "buyer"],
      default: "worker",
    },
    coin: {
      type: Number,
      default: 50,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
