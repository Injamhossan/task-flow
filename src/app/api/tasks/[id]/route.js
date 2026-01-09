import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params; // Next.js 15+ compatibility
    console.log("Fetching Task ID:", id);

    await dbConnect();
    const task = await Task.findById(id);

    if (!task) {
      console.log("Task not found in DB for ID:", id);
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
