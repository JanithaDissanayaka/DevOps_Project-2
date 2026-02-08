import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );

  // 🔥 THIS IS THE MISSING PART
  response.cookies.set({
    name: "token",
    value: user._id.toString(),
    httpOnly: true,
    path: "/",      // REQUIRED
    sameSite: "lax",
  });

  return response;
}
