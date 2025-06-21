"use client";

import { useState, useEffect } from "react";
import { listCalendarEvents } from "@/lib/google-calendar";
import { format, addDays, startOfDay, endOfDay } from "date-fns";

export default function Calendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const today = startOfDay(new Date());
        const nextWeek = endOfDay(addDays(today, 7));
        
        const calendarEvents = await listCalendarEvents(today, nextWeek);
        setEvents(calendarEvents);
        setError(null);
      } catch (err) {
        console.error("Failed to load calendar events:", err);
        setError("Failed to load calendar events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Your Calendar (Next 7 Days)</h2>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event: any) => (
            <div
              key={event.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold">{event.summary}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(event.start.dateTime), "MMM d, yyyy h:mm aa")} -{" "}
                {format(new Date(event.end.dateTime), "h:mm aa")}
              </p>
              {event.description && (
                <p className="text-sm text-gray-500 mt-2">{event.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No events scheduled for the next 7 days.
          </p>
        )}
      </div>
    </div>
  );
} 