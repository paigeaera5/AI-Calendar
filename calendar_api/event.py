"""Event object for storing event data."""

from datetime import date, datetime, timedelta
from typing import List, Union
from tzlocal import get_localzone_name


class Event:
    """Class for storing calendar event information."""

    def __init__(
            self,
            summary: str,
            start: Union[date, datetime],
            end: Union[date, datetime] = None,
            timezone: str = get_localzone_name(),
            description: str = None,
            id: str = None,
            reminders: List[{str, str}] = None,
            reminders_default: bool = True
    ) -> None:
        """Initialize Event with necessary information."""
        self.summary = summary
        self.description = description
        self.start = start
        self.end = end
        if end:
            self.end = end
        elif isinstance(start, datetime):
            self.end = start + timedelta(hours=1)
        elif isinstance(start, date):
            self.end = start + timedelta(days=1)
        self.timezone = timezone
        self.id = id
        self.reminder_default = reminders_default
        self.reminders = reminders

    def get_id(self) -> str:
        """Get the id of an event."""
        return self.id

    def to_resource(self):
        """Convert Event object to event resource body used by API."""
        data = {
            'id': self.id,
            'summary': self.summary,
            'description': self.description,
            'reminders': {
                'useDefault': self.reminder_default,
                'overrides': self.reminders
            }
        }
        if isinstance(self.start, datetime) and isinstance(self.end, datetime):
            data['start'] = {
                'dateTime': self.start.isoformat(),
                'timeZone': self.timezone
            }
            data['end'] = {
                'dateTime': self.end.isoformat(),
                'timeZone': self.timezone
            }
        elif isinstance(self.start, date) and isinstance(self.end, date):
            data['start'] = {'date': self.start.isoformat()}
            data['end'] = {'date': self.end.isoformat()}
        return data
