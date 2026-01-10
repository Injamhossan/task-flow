
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true },
    amount: { type: Number, required: true }, 
    coins: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, default: "completed" },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
