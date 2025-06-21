export async function listCalendarEvents(timeMin: Date, timeMax: Date) {
    try {
      const response = await fetch(
        `/api/calendar?timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      throw error;
    }
  }