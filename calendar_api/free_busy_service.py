"""Represents free/busy information for a given calendar(s) and/or group(s)"""

from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from beautiful_date import BeautifulDate, D
from typing import Dict, List, Union
from collections import namedtuple
from calendar_client import CalendarClient

TimeRange = namedtuple('TimeRange', ('start', 'end'))

class FreeBusyService(CalendarClient):

    def __init__(
            self,
            calendar_id: str = 'primary',
            ids: Union[str, List[str]] = None,
            *,
            time_min: Union[date, datetime, BeautifulDate] = None,
            time_max: Union[date, datetime, BeautifulDate] = None,
            group_expansion_max: int = None,
            calendar_expansion_max: int = None,
            ignore_errors: bool = False
    ) -> None:
        super().__init__(calendar_id)
        self.time_min = time_min or datetime.now()
        self.time_max = time_max or time_min + relativedelta(weeks=2)
        self.group_expansion_max = group_expansion_max
        self.calendar_expansion_max = calendar_expansion_max

        if ids is None:
            self.cal_ids = ['primary']
        elif not isinstance(ids, (list, tuple, set)):
            self.cal_ids = [ids]

        self.free_busy = self.get_free_busy()

    def get_free_busy(self):
        print('start', self.time_min)
        print('end', self.time_max)
        body = {
            "timeMin": self.time_min.isoformat() + 'Z',
            "timeMax": self.time_max.isoformat() + 'Z',
            "timeZone": self.default_cal['timeZone'],
            "groupExpansionMax": self.group_expansion_max,
            "calendarExpansionMax": self.calendar_expansion_max,
            "items": [
                {
                    "id": 'primary'
                } 
            ]
        }
        return self.service.freebusy().query(body=body).execute()
    
    def get_busy(self):
        return self.free_busy.get('calendars').get('primary').get('busy')
