"""EventService object for working with events in the calendar."""

from datetime import date, datetime, timedelta

from typing import Union
from calendar_client import CalendarClient
from event import Event


class EventsService(CalendarClient):
    """Class for event management."""

    def list_events(
            self,
            calendar_id: str = 'primary',
            max_results: int = None,
            order_by: str = 'startTime',
            keywords: str = None,
            single_events: bool = True,
            time_min: Union[date, datetime] = None,
            time_max: Union[date, datetime] = None
    ) -> list:
        """Get a list of all events that currently exist."""
        time_min = time_min or datetime.now()
        time_max = time_max or time_min + timedelta(days=365)
        if isinstance(time_min, date):
            time_min = datetime(
                year=time_min.year,
                month=time_min.month,
                day=time_min.day,
                hour=0,
                minute=0
            )
        if isinstance(time_max, date):
            time_max = datetime(
                year=time_max.year,
                month=time_max.month,
                day=time_max.day,
                hour=23,
                minute=59
            )
        events = self.service.events().list(
            calendarId=calendar_id,
            timeMin=time_min.isoformat() + 'Z',
            timeMax=time_max.isoformat() + 'Z',
            q=keywords,
            timeZone=self.default_cal['timeZone'],
            singleEvents=single_events,
            maxResults = max_results,
            orderBy=order_by
        ).execute()
        return events

    def add_event(
            self,
            event: Event
    ):
        """Add the provided Event object to the default calendar."""
        data = event.to_resource()

        self.service.events().insert(
            calendarId='primary',
            body=data
        ).execute()
    
    def delete_event(
            self,
            event_id: str
    ):
        self.service.events().delete(
            calendarId='primary',
            eventId=event_id
        ).execute()
