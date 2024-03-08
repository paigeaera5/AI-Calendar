"""EventService object for working with events in the calendar."""

from calendar_api.calendar_client import CalendarClient
from calendar_api.event import Event


class EventsService(CalendarClient):
    """Class for event management."""

    def get_all_events(self) -> list:
        """Get a list of all events that currently exist."""
        events = self.service.events().list(
            calendarId=self.primary_cal['id'],
            timeZone=self.primary_cal['timeZone'],
            singleEvents=True, orderBy='startTime'
        ).execute()
        return events

    def get_event(
            self,
            event_id: str
    ):
        """Get data about a single event."""
        event = self.service.events().get(
            calendarId=self.primary_cal['id'],
            eventId=event_id
        ).execute()
        return event

    def add_event(
            self,
            event: Event
    ):
        """Add the provided event to the default calendar."""
        data = {
            "summary": event.summary,
            "description": event.description,
            "start": event.start,
            "end": event.end,
            "reminders": {
                "useDefault": event.reminder_default,
                "overrides": event.reminders
            }
        }
        self.service.events().insert(
            calendarId=self.primary_cal['id'],
            body=data
        ).execute()
