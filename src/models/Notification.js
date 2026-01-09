
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    toEmail: {
      type: String,
      required: true,
    },
    actionRoute: {
      type: String, // e.g., "/dashboard/tasks"
      default: "",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
