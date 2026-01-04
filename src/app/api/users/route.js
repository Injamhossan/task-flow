
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, photoURL, role } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { message: "Name and Email are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      photoURL,
      role: role || "worker",
      coin: 50, // Default coins for new users
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
