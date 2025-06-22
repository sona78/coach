import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  
  // For now, just print the data
  console.log("Received goal submission:", {
    sessionId: session.user?.email, // Using email as session ID for now
    goal: data.goal
  });

  return NextResponse.json({ success: true });
} 