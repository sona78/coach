import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const data = await request.json();
  
  // Log the received data
  console.log("Received event submission:", {
    sessionId: session.user?.email,
    situation: data.situation,
    reaction: data.reaction
  });

  // Send back a dummy LLM response
  return NextResponse.json({ 
    success: true,
    feedback: "Based on your reaction to this situation, I notice you showed good emotional awareness. Consider that in similar future situations, you might also want to take a moment to reflect on the underlying causes of your reaction. This can help you respond even more effectively next time."
  });
} 