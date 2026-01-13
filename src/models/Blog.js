
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // Storing HTML or rich text
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      name: String,
      email: String,
      photo: String,
    },
    tags: [String],
    readTime: {
      type: Number, // in minutes
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
