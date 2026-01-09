
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    // Fetch all users sorted by latest
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { userId, role } = await request.json();
    await dbConnect();
    
    // Prevent updating admin@taskflow.com to non-admin
    const userToUpdate = await User.findById(userId);
    if (userToUpdate.email === "admin@taskflow.com" && role !== "admin") {
      return NextResponse.json({ message: "Cannot demote main admin" }, { status: 403 });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
