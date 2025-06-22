import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function GET(req: Request) {
  const { userId, goal, situation, reaction } = await req.json();
  try {
    const query = `Situation: ${situation} Reaction: ${reaction}`;
    const namespace = pc.Index("life-coach").namespace(userId);

    try {
      const results = await namespace.searchRecords({
        query: {
          topK: 5,
          inputs: { text: query },
        },
      });
    } catch (error) {
      console.error("Error retrieving relevant events:", error);
    }

    const messages = [
      {
        role: "user",
        content: `Based on the following relevant events and the personal goal of ${goal}, provide advice to the user in bullet point form`,
      },
      {
        role: "system",
        content: "Here are the relevant events: " + "THIS HAPPENED",
      },
    ];

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages,
    // });

    // res.status(200).json({ advice: response.choices[0]?.message?.content?.trim() || "" });
  } catch (error) {
    console.error("Error getting advice for user:", error);
  }
}
