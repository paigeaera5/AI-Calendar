"""Create event based on LLM response and user preferences."""

from datetime import date, datetime, timedelta, time
from dateutil.relativedelta import relativedelta
from typing import List, Union
from beautiful_date import BeautifulDate
from tzlocal import get_localzone_name
from enum import IntEnum
from calendar_client import CalendarClient
from event_service import EventsService
from free_busy_service import FreeBusyService
from event import Event

class Days(IntEnum):
    """Enum class for assigning int values to days of the week."""
    M = 0   # Monday
    T = 1   # Tuesday
    W = 2   # Wednesday
    R = 3   # Thursday
    F = 4   # Friday
    S = 5   # Saturday
    U = 6   # Sunday

class EventGenerator(EventsService):
    """Class for event generating."""

    def __init__(
            self,
            llm_output: str,
            start_date: Union[date, BeautifulDate],
            start_time: time,
            end_date: Union[date, BeautifulDate],
            end_time: time,
            days: List[int]
    ) -> None:
        super().__init__()
        self.subtasks = llm_output
        self.start_time = start_time
        self.end_time = end_time
        self.start_date = start_date
        self.end_date = end_date
        self.days = days

        if isinstance(start_date, BeautifulDate):
            self.start_date = date(year=start_date.year, month=start_date.month, day=start_date.day)
        if isinstance(end_date, BeautifulDate):
            self.end_date = date(year=end_date.year, month=end_date.month, day=end_date.day)

    def _free_times(
            self,
            events: List,
            time_start: datetime,
            time_end: datetime
    ) -> List:
        if not events:
            return [(time_start, time_end)]
        free = []
        first = events[0]
        #time_start = datetime.isoformat(time_start)
        prev_start = datetime.fromisoformat(first["start"].get("dateTime", first["start"].get("date")))
        if time_start < prev_start:
            print('append 1',time_start, prev_start)
            free.append((time_start, prev_start))
        prev_end = datetime.fromisoformat(first["end"].get("dateTime", first["end"].get("date")))
        for event in events:
            start = datetime.fromisoformat(event["start"].get("dateTime", event["start"].get("date")))
            end = datetime.fromisoformat(event["end"].get("dateTime", event["end"].get("date")))
            if start == end + timedelta(days=1):
                return [(time_start, time_end)]
            print('start',start)
            print('end',end)
            if start < prev_end and time_start < start:
                print('append 2',time_start, start)
                free.append((time_start, start))
            else:
                print('append 3',prev_end, start)
                free.append((prev_end, start))
            prev_start = datetime.combine(start.date(), self.start_time)
            prev_end = datetime.combine(end.date(), self.end_time)
        if prev_end < time_end:
            print('append 4',prev_end, time_end)
            free.append((prev_end, time_end))
        return free

    def find_free(self) -> List:
        start = datetime.combine(self.start_date, self.start_time)
        end = datetime.combine(self.start_date, self.end_time)
        incr = timedelta(days=1)
        free = []
        while not start.date() == self.end_date:
            print('here')
            print(start, self.end_date)
            if start.weekday() not in self.days:
                start += incr
                end += incr
                continue
            print(start)
            print(end)
            events = self.list_events(time_min=start, time_max=end).get("items", [])
            print(len(events))
            print('printing')
            free.extend(self._free_times(events=events, time_start=start, time_end=end))
            start += incr
            end += incr
        return free
    
    def find_busy(self):
        start = datetime.combine(self.start_date, self.start_time)
        end = datetime.combine(self.start_date, self.end_time)
        incr = relativedelta(days=1)
        free = []
        while not start.date() == self.end_date:
            print('here')
            print(start, end)
            if start.weekday() not in self.days:
                print('false')
                start += incr
                end += incr
                continue
            print('search start',start)
            print('search end',end)
            print("Next 10 events:")
            events = self.list_events(time_min=start, time_max=end).get("items", [])
            for event in events:
                s = event["start"].get("dateTime", event["start"].get("date"))
                e = event["end"].get("dateTime", event["end"].get("date"))
                print(s, e, event["summary"])
            freebusy = FreeBusyService(time_min=start, time_max=end)
            print(freebusy.get_busy())
            for x in freebusy.get_busy():
                print('busy start',datetime.fromisoformat(x.get('start')).time())
                print('busy end',datetime.fromisoformat(x.get('end')))
            print('printing')
            free.extend(freebusy.get_busy())
            start += incr
            end += incr
        return free
