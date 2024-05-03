"""Class to store calendar availablity."""

from datetime import time, date, datetime, timedelta
from typing import Dict, List
from collections import namedtuple
from .event_service import EventsService

TimeRange = namedtuple('TimeRange', ('start', 'end'))


class Availability(EventsService):
    """Class for storing free time found on calendar."""

    def __init__(
            self,
            calendar_id: str = 'primary',
            *,
            start_date: date,
            start_time: time,
            end_date: date,
            end_time: time,
            days: List[int]
    ) -> None:
        """Initialize Availability with time frame information."""
        super().__init__(calendar_id)
        self.free_days = []
        self.frees = self._find_free(
            start_date=start_date,
            start_time=start_time,
            end_date=end_date,
            end_time=end_time,
            days=days
        )

    def _find_free(
            self,
            start_date: date,
            start_time: time,
            end_date: date,
            end_time: time,
            days: List[int]
    ) -> Dict:
        """Find all free time ranges during user specified time frame."""
        free_dict = {}
        cur = datetime.combine(start_date, time(hour=0, minute=0))
        cur_end = datetime.combine(start_date, time(hour=23, minute=59))
        incr = timedelta(days=1)
        if (datetime.now().time() > start_time
                and datetime.now().date() == start_date):
            cur += incr
            cur_end += incr

        while cur.date() <= end_date:
            if cur.weekday() not in days:
                cur += incr
                cur_end += incr
                continue
            events = self.list_events(
                time_min=cur,
                time_max=cur_end
            ).get("items", [])
            next_check = start_time
            free = []
            if not events:
                start = datetime.combine(cur, start_time)
                end = datetime.combine(cur, end_time)
                free.append(TimeRange(start, end))
                next_check = end_time
            for event in events:
                start = event["start"].get("dateTime",
                                           event["start"].get("date"))
                end = event["end"].get("dateTime",
                                       event["end"].get("date"))

                if 'T' in start:
                    start = datetime.fromisoformat(start)
                    start = start.replace(hour=(start.hour-1) % 24,
                                          tzinfo=None)
                else:
                    continue

                if 'T' in end:
                    end = datetime.fromisoformat(end)
                    end = end.replace(hour=(end.hour+1) % 24,
                                      tzinfo=None)
                else:
                    continue

                if next_check == start.time():
                    continue
                if start.time() <= next_check:
                    if end.time() >= start_time:
                        next_check = end.time()
                    continue
                if end.time() >= end_time:
                    if start.time() > next_check and start.time() <= end_time:
                        free_start = datetime.combine(start.date(), next_check)
                        free.append(TimeRange(free_start, start))
                        next_check = end.time()

                if start.time() > end_time or end.time() < next_check:
                    start = datetime.combine(start.date(), next_check)
                    end = datetime.combine(end.date(), end_time)
                    free.append(TimeRange(start, end))
                    next_check = start_time
                elif start.time() > next_check:
                    free_start = datetime.combine(start.date(), next_check)
                    free.append(TimeRange(free_start, start))
                    next_check = end.time()

            if next_check < end_time:
                start = datetime.combine(start.date(), next_check)
                end = datetime.combine(end.date(), end_time)
                free.append(TimeRange(start, end))

            if free:
                self.free_days.append(cur.day)
                free_dict[cur.day] = free
            cur += incr
            cur_end += incr
        return free_dict
