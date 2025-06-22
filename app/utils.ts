// Import the Pinecone library
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const addEventToUser = async (userId: string, situation: string, reaction: string) => {
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
    throw new Error("Failed to add event to user");
  }
};

const getRelevantEvents = async (userId: string, situation: string, reaction: string) => {
  const query = `Situation: ${situation} Reaction: ${reaction}`;
  const namespace = pc.Index("life-coach").namespace(userId);

  try {
    const results = await namespace.searchRecords({
      query: {
        topK: 5,
        inputs: { text: query },
      },
    });

    return results;
  } catch (error) {
    console.error("Error retrieving relevant events:", error);
    throw new Error("Failed to retrieve relevant events");
  }
};

const getAdviceForUser = async (
  userId: string,
  goal: string,
  situation: string,
  reaction: string
) => {
  const userInput = await getRelevantEvents(userId, situation, reaction);

  const messages = [
    {
      role: "user",
      content: `Based on the following relevant events and the personal goal of ${goal}, provide advice to the user in bullet point form`,
    },
    {
      role: "system",
      content: "Here are the relevant events: " + userInput,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};
