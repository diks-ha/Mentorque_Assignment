// Removed Google Calendar integration (no OAuth)

export async function createCalendarEventWithMeet() {
  console.log("[googleCalendar] Disabled - no Meet link");
  return { eventId: null, meetLink: null };
}
