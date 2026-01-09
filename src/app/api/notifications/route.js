
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email required" }, { status: 400 });
  }

  try {
    await dbConnect();
    // Fetch notifications sorted by newest first
    const notifications = await Notification.find({ toEmail: email }).sort({ createdAt: -1 });
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Optional: Endpoint to create a notification (e.g. triggered by other actions)
export async function POST(request) {
  try {
    const { message, toEmail, actionRoute } = await request.json();
    await dbConnect();
    const newNotification = await Notification.create({ message, toEmail, actionRoute });
    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id } = await request.json();
    await dbConnect();
    await Notification.findByIdAndUpdate(id, { read: true });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating notification" }, { status: 500 });
  }
}
