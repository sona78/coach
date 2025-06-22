import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, situation, reaction } = body;
  const namespace = pc.Index("life-coach").namespace(userId);

  const text = `Today ${new Date().toDateString()} I had the following situation: ${situation}. My reaction was: ${reaction}.`;
  try {
    const record = {
      id: `${userId}-${Date.now()}`,
      values: [],
      metadata: {
        chunk_text: text,
        user_id: userId,
      },
    };

    await namespace.upsert([record]);
  } catch (error) {
    console.error("Error adding event to user:", error);
  }
}
