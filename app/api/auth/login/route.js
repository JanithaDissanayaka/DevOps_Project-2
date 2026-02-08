import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response("Invalid credentials", { status: 401 });
  }

  return new Response(
    JSON.stringify({ message: "Login successful" }),
    { status: 200 }
  );
}
