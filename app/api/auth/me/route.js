import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Authenticated" },
    { status: 200 }
  );
}
