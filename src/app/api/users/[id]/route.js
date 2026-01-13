
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
