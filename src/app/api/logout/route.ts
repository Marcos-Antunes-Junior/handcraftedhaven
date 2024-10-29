// pages/api/logout.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", { expires: new Date(0) }); // Clear cookie
  return response;
}