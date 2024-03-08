from datetime import date, datetime # Datetime

class Event:
    """Class for event object information."""

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
        return self.id
    
    def update_reminder(
            self,
            method,
            minutes
    ) -> None:
        reminder = {
            method,
            minutes
        }
        self.reminders.append(reminder)