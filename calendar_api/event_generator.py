"""
Create event based on LLM response and user preferences.

This is what connects to the front end for generating llm events.
"""

from datetime import date, datetime, timedelta, time
import re
from typing import List
from enum import IntEnum
from event_service import EventsService
from llm_output_service import LlmOutputData
from availability import Availability
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
            overall_task: str,
            llm_output: str,
            start_date: date,
            start_time: time,
            end_date: date,
            end_time: time,
            days: List[str]
    ) -> None:
        super().__init__()
        self.overall = overall_task
        self.llm_data = LlmOutputData(llm_output=llm_output)
        self.start_time = start_time
        self.end_time = end_time
        self.start_date = start_date
        self.end_date = end_date
        self.days_str = ", ".join(days)
        self.days = []
        for day in days:
            self.days.append(Days[day.upper()])
        #print(self.days)

        self.available = Availability(
            start_date=start_date,
            start_time=start_time,
            end_date=end_date,
            end_time=end_time,
            days=self.days
        )

        self.generated_events = self._make_events(overall_task=overall_task)

    def add_to_cal(self) -> None:
        for event in self.generated_events:
            self.add_event(event)

    def _find_time_matches(
            self,
            lengths: List,
    ) -> List:
        time_list = []
        frees = self.available.frees
        day_idx = self.available.free_days
        next_free = 0
        for num, interval in lengths:
            found = False
            while not found:
                if next_free >= len(day_idx):
                    return []
                times = frees.get(day_idx[next_free])
                for time in times:
                    time_diff = time[1] - time[0]
                    if 'hour' in interval:
                        total = time_diff.total_seconds() / 3600
                    elif 'minute' in interval:
                        total = time_diff.total_seconds() / 60

                    if (total < num):
                        continue

                    found = True
                    time_list.append(time)
                    break
                next_free += 1
        return time_list
    
    def _make_events(
            self,
            overall_task: str
    ) -> List:
        error_msg = f"""\
Not enough free time found. \
Either make daily time frame longer or add more days.\
"""
        events = []
        subtasks = self.llm_data.task_list
        task_lengths = self.llm_data.task_lengths
        times = self._find_time_matches(lengths=task_lengths)
        
        assert(len(times) == len(subtasks)), error_msg

        for i in range(0, len(subtasks)):
            task = subtasks[i]
            event_summary = overall_task.capitalize() + ' (Part ' + str(i+1) + ')'            
            num, interval = task_lengths[i]

            start = times[i][0]
            if 'hour' in interval:
                end = start + timedelta(hours=num)
            elif 'minute' in interval:
                end = start + timedelta(minutes=num)

            timezone = self.default_cal['timeZone']
            events.append(
                Event(
                    summary=event_summary,
                    start=start,
                    end=end,
                    timezone=timezone,
                    description=task
                )
            )
        return events
