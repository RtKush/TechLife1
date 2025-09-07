
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db.lib";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || typeof email !== "string" || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (err) {
    console.error("REGISTRATION_ERROR", err);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
