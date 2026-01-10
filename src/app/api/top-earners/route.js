
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Submission from "@/models/Submission";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    
    const topEarners = await Submission.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: "$worker_email",
          totalCoins: { $sum: "$payable_amount" },
          totalTasks: { $count: {} }
        }
      },
      { $sort: { totalCoins: -1 } },
      { $limit: 6 }
    ]);

    // Populate user details manually since we grouped by email (strings)
    const enrichedEarners = await Promise.all(topEarners.map(async (earner) => {
        const user = await User.findOne({ email: earner._id }).select("name photoURL role");
        return {
            ...earner,
            name: user?.name || "Unknown Worker",
            photoURL: user?.photoURL || "",
            role: "Worker", // Default role title for display
        };
    }));

    return NextResponse.json(enrichedEarners);
  } catch (error) {
    console.error("Error fetching top earners:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
