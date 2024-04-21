import os.path

from datetime import date, datetime, time, timedelta
from dateutil.tz import gettz
from beautiful_date import Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sept, Oct, Dec, hours, days, Nov
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from calendar_client import CalendarClient
from event_service import EventsService
from event_generator import EventGenerator, Days
from free_busy_service import FreeBusyService
from event import Event

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]


def main():
  """Shows basic usage of the Google Calendar API.
  Prints the start, end, and name of the next 10 events on the user's calendar.
  """
  client = CalendarClient()
  event_service = EventsService()
  output = """1. Research and select the appropriate components for the gaming desktop (time: 2 hours)
                * Identify the type of games you want to play on the desktop
                * Determine the required hardware specifications for these games
                * Compare prices of different components to find the best deals
                * Create a list of recommended components
        2. Purchase all necessary components (time: 4 hours)
                * Visit online retailers or physical stores to purchase the selected components
                * Ensure that all components are compatible with each other
                * Verify the availability of components before making a purchase
        3. Install the operating system and necessary software (time: 6 hours)
                * Download and install the operating system (Windows or macOS)
                * Install necessary drivers for the hardware components
                * Install games and other software as needed
        4. Configure and optimize the desktop for optimal performance (time: 8 hours)
                * Adjust settings in the operating system and applications to improve performance
                * Update the BIOS settings for optimal performance
                * Run benchmarking tests to identify areas for improvement
        5. Test and troubleshoot the desktop (time: 4 hours)
                * Play games and run applications to test the desktop's performance
                * Identify any issues or errors and troubleshoot them
                * Make sure the desktop is functioning properly and meets your expectations
        6. Assemble the desktop (time: 2 hours)
                * Follow the manufacturer's instructions to assemble the desktop
                * Connect all hardware components and ensure they are securely connected
                * Test the desktop to ensure it is functioning properly
        7. Finalize the desktop by adding any finishing touches (time: 1 hour)
                * Add decorative elements such as stickers or lighting
                * Connect any additional peripherals such as a keyboard or mouse
                * Test the desktop one last time to ensure everything is working properly
        Total time: 25 hours"""
  day = datetime.now()
  end = day + timedelta(days=7)
  generator = EventGenerator(llm_output=output, start_date=day.date(), start_time=time(hour=11, minute=30), end_date=end.date(), end_time=time(hour=20, minute=30), days=[Days.F, Days.S, Days.U])

  e = Event(summary="Mock event", start=(Mar / 29 / 2024)[13:00], timezone=client.default_cal['timeZone'])
  e1 = Event(summary="Mock event 1", start=(Mar / 30 / 2024), timezone=client.default_cal['timeZone'])
  e2 = Event(summary="Mock event 2", start=(Mar / 30 / 2024)[14:25], end=(Mar / 30 / 2024)[16:45], timezone=client.default_cal['timeZone'])
  #event_service.add_event(e)
  #event_service.add_event(e1)
  #event_service.add_event(e2)

  events = event_service.list_events(time_min=(Mar / 28 / 2024)[11:00],time_max=(Mar / 30 / 2024)[16:00], max_results=20).get("items", [])

  if not events:
    print("No upcoming events found.")
    return

  print("Next 10 events:")
  for event in events:
    start = event["start"].get("dateTime", event["start"].get("date"))
    end = event["end"].get("dateTime", event["end"].get("date"))
    print(start, end, event["summary"])
  
  frees = generator.find_busy()
  print(frees)

  #freebusy = FreeBusyService(time_min=(Mar / 29 / 2024), time_max=(Apr / 1 / 2024))
  #print(freebusy.get_busy())
  return
  while events:
    print('\ndeleting ' + events[0]["summary"])
    event_service.delete_event(events[0]["id"])
    events = event_service.list_events(keywords='mock', max_results=10).get("items", [])

    for event in events:
      start = event["start"].get("dateTime", event["start"].get("date"))
      end = event["end"].get("dateTime", event["end"].get("date"))
      print(start, end, event["summary"])

  if not events:
    print("No upcoming events found.")
    return

if __name__ == "__main__":
  main()
