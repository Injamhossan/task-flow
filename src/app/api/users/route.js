
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

    // Determine Role and Coins
    let userRole = role || "worker";
    let userCoins = 0;

    // Admin Hardcode Check
    if (email === "admin@taskflow.com") {
      userRole = "admin";
      userCoins = 0; 
    } else {
      // Coin Logic
      if (userRole === "worker") {
        userCoins = 10;
      } else if (userRole === "buyer") {
        userCoins = 50;
      }
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      photoURL,
      role: userRole,
      coin: userCoins,
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Force Admin Role for specific email if not already set
    if (email === "admin@taskflow.com" && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// NEW: PATCH method to update user profile
export async function PATCH(request) {
  try {
    const { email, name, photoURL } = await request.json();
    await dbConnect();
    
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { name, photoURL }, 
      { new: true }
    );

    if (!updatedUser) {
       return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
