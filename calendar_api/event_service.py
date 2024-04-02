"""EventService object for working with events in the calendar."""

from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta

from typing import List, Union
from beautiful_date import BeautifulDate, D
from calendar_client import CalendarClient
from event import Event

import datetime


class EventsService(CalendarClient):
    """Class for event management."""

    def get_events(
            self,
            calendar_id: str = None,
            max_results: int = None,
            order_by: str = None,
            keywords: str = None,
            single_events: bool = False,
            time_min: Union[date, datetime.datetime, BeautifulDate] = None,
            time_max: Union[date, datetime.datetime, BeautifulDate] = None,
    ) -> list:
        """Get a list of all events that currently exist."""
        time_min = time_min or datetime.datetime.now()
        time_max = time_max or time_min + timedelta(days=365)
        if isinstance(time_min, BeautifulDate):
            time_min = datetime.datetime(year=time_min.year, month=time_min.month, day=time_min.day)
        if isinstance(time_max, BeautifulDate):
            time_max = datetime.datetime(year=time_max.year, month=time_max.month, day=time_max.day)
        events = self.service.events().list(
            calendarId=self.primary_cal['id'],
            timeMin=time_min.isoformat() + 'Z',
            timeMax=time_max.isoformat() + 'Z',
            q=keywords,
            timeZone=self.primary_cal['timeZone'],
            singleEvents=True,
            orderBy='startTime'
        ).execute()
        return events

    def get_event(
            self,
            event_id: str
    ):
        """Get data about a single event."""
        event = self.service.events().get(
            calendarId='primary',
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
            "description": event.description
        }
        if isinstance(event.start, datetime.datetime) and isinstance(event.end, datetime.datetime):
            data['start'] = {
                'dateTime': event.start.isoformat(),
                'timeZone': event.timezone
            }
            data['end'] = {
                'dateTime': event.end.isoformat(),
                'timeZone': event.timezone
            }
        elif isinstance(event.start, datetime.date) and isinstance(event.end, datetime.date):
            data['start'] = {'date': event.start.isoformat()}
            data['end'] = {'date': event.end.isoformat()}

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
