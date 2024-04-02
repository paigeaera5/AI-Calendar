import datetime
import os.path

from datetime import date, datetime, timedelta
from beautiful_date import Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sept, Oct, Dec, hours, days, Nov
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from calendar_client import CalendarClient
from event_service import EventsService
from event import Event

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]


def main():
  """Shows basic usage of the Google Calendar API.
  Prints the start and name of the next 10 events on the user's calendar.
  """
  client = CalendarClient()
  event_service = EventsService()

  e = Event(summary="Mock event", start=(Mar / 23 / 2024)[9:00])
  e1 = Event(summary="Mock event 1", start=(Mar / 25 / 2024))
  e2 = Event(summary="Mock event 2", start=(Mar / 26 / 2024)[14:25], end=(Mar / 26 / 2024)[16:45])
  event_service.add_event(e)
  event_service.add_event(e1)
  event_service.add_event(e2)

  events = event_service.get_events(keywords='mock', time_min=(Mar / 20 / 2024)[23:00]).get("items", [])

  if not events:
    print("No upcoming events found.")
    return

  for event in events:
    start = event["start"].get("dateTime", event["start"].get("date"))
    end = event["end"].get("dateTime", event["end"].get("date"))
    print(start, end, event["summary"])
  
  print('deleting' + events[0]["summary"])
  event_service.delete_event(events[0]["id"])
  events = event_service.get_events(keywords='mock', time_min=(Mar / 20 / 2024)[23:00]).get("items", [])


  for event in events:
    start = event["start"].get("dateTime", event["start"].get("date"))
    end = event["end"].get("dateTime", event["end"].get("date"))
    print(start, end, event["summary"])

if __name__ == "__main__":
  main()
