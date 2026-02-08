import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { username, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
  });

  return new Response(
    JSON.stringify({ message: "User registered" }),
    { status: 201 }
  );
}
