
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
