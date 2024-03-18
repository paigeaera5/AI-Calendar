"""Event object for storing event data."""

from datetime import date, datetime


class Event:
    """Class for storing calendar event information."""

    def __init__(
            self,
            summary: str,
            description: str,
            start_date: date,
            start_datetime: datetime,
            end_date: date,
            end_datetime: datetime,
            timezone: str = None,
            id: str = None,
            reminders_default: bool = False
    ) -> None:
        """Initialize Event with necessary information."""
        self.summary = summary
        self.description = description
        self.start = {
            "date": start_date,
            "dateTime": start_datetime,
            "timeZone": timezone
        }
        self.end = {
            "date": end_date,
            "dateTime": end_datetime,
            "timeZone": timezone
        }
        self.id = id
        self.reminder_default = reminders_default
        self.reminders = []

    def get_id(self) -> str:
        """Get the id of an event."""
        return self.id

    def update_reminder(
            self,
            method,
            minutes
    ) -> None:
        """Add a reminder to the event."""
        reminder = {
            method,
            minutes
        }
        self.reminders.append(reminder)
