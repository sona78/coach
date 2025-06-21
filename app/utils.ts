// Import the Pinecone library
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const addEventToUser = async (userId: string, texts: string[]) => {
  const namespace = pc.Index("life-coach").namespace(userId);

  try {
    const records = texts.map((text: string, idx: number) => ({
      id: `${userId}-${Date.now()}-${idx}`,
      values: [],
      metadata: {
        chunk_text: text,
        user_id: userId,
      },
    }));

    await namespace.upsert(records);
  } catch (error) {
    console.error("Error adding event to user:", error);
    throw new Error("Failed to add event to user");
  }
};

const getRelevantEvents = async (userId: string, query: string) => {
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

const getAdviceForUser = async (userId: string, goal: string, event: string) => {
  const userInput = await getRelevantEvents(
    userId,
    `${goal} advice based on ${event} happening today`
  );

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
    model: "gpt-3-0125-preview",
    messages,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};
