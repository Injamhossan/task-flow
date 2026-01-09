import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema(
  {
    worker_email: { type: String, required: true },
    worker_name: { type: String, required: true },
    withdrawal_coin: { type: Number, required: true },
    withdrawal_amount: { type: Number, required: true }, // Dollar amount
    payment_system: { type: String, required: true },
    account_number: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);
