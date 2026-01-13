
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Basic validation could go here
    const newBlog = await Blog.create(data);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
