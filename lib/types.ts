export type EventDateTime = {
  date?: string;
  dateTime?: string;
  timeZone?: string;
};

export type CalendarEvent = {
  id: string;
  summary: string;
  description?: string;
  start: EventDateTime;
  end: EventDateTime;
  htmlLink: string;
}; 