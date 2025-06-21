import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { CalendarEvent } from "@/lib/types";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const timeMin = searchParams.get("timeMin");
  const timeMax = searchParams.get("timeMax");

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Google Calendar API error: ${response.statusText}`,
        errorBody
      );
      throw new Error(`Google Calendar API error: ${response.statusText}`);
    }

    const data: { items: CalendarEvent[] } = await response.json();
    return NextResponse.json(data.items || []);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  try {
    const event: Partial<CalendarEvent> = await request.json();

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Google Calendar API error: ${response.statusText}`,
        errorBody
      );
      throw new Error(`Google Calendar API error: ${response.statusText}`);
    }

    const data: CalendarEvent = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
}