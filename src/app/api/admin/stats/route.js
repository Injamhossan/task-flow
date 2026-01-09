
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    
    // Fetch counts
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    
    // Calculate total coins in system
    const users = await User.find({}, 'coin');
    const totalCoins = users.reduce((acc, curr) => acc + (curr.coin || 0), 0);
    
    // Fetch recent users (limit 5)
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
        totalUsers,
        totalTasks,
        totalCoins,
        recentUsers
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
