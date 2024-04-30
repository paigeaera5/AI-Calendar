import os.path

from datetime import date, datetime, time, timedelta
from beautiful_date import Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sept, Oct, Dec, hours, days, Nov
from calendar_client import CalendarClient
from event_service import EventsService
from event_generator import EventGenerator
from event import Event
from availability import Availability

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]


def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start, end, and name of the next 10 events on the user's calendar.
    """
    client = CalendarClient()
    event_service = EventsService()
    task = "assemble Gaming DeskTop"
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
    generator_start_date = datetime.now().date()
    generator_start_time = time(hour=11, minute=30)
    generator_end_date = generator_start_date + timedelta(days=21)
    generator_end_time = time(hour=20, minute=30)
    days_of_week = ['M','T','F','U']
  
    day = datetime.now()
    end = day + timedelta(days=21)
    generator = EventGenerator(
        overall_task=task,
        llm_output=output,
        start_date=generator_start_date,
        start_time=generator_start_time,
        end_date=generator_end_date,
        end_time=generator_end_time,
        days=days_of_week
    )
    #print(generator.llm_data.task_list)
    #print(output.splitlines())

    #e = Event(summary="Mock event", start=(Apr / 24 / 2024)[13:00], timezone=client.default_cal['timeZone'])
    #e1 = Event(summary="Mock event 1", start=(Apr / 26 / 2024), timezone=client.default_cal['timeZone'])
    #e2 = Event(summary="Mock event 2", start=(Apr / 30 / 2024)[14:25], end=(Apr / 30 / 2024)[16:45], timezone=client.default_cal['timeZone'])
    #event_service.add_event(e)
    #event_service.add_event(e1)
    #event_service.add_event(e2)
    
    #a = Availability(start_date=day.date(), start_time=time(hour=11, minute=30), end_date=end.date(), end_time=time(hour=18, minute=30), days=[Days.T, Days.F, Days.U])
    print("adding")
    generator.add_to_cal()

    events = event_service.list_events(
        time_min=generator_start_date,
        time_max=generator_end_date,
        keywords=task,
        max_results=20
    ).get("items", [])

    if not events:
        print("No upcoming events found.")
        return

    print("Generated events:")
    for event in events:
        st = event["start"].get("dateTime", event["start"].get("date"))
        en = event["end"].get("dateTime", event["end"].get("date"))
        print(st, en, event["summary"])

    while events:
        print('\ndeleting ' + events[0]["summary"])
        event_service.delete_event(events[0]["id"])
        events = event_service.list_events(
            time_min=generator_start_date,
            time_max=generator_end_date,
            keywords=task,
            max_results=20
        ).get("items", [])

        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            end = event["end"].get("dateTime", event["end"].get("date"))
            print(start, end, event["summary"])

        if not events:
            print("No upcoming events found. All were deleted.")

    print("\nTesting generation when not enough days given.")
    try:
        days_of_week = ['T','U']
        generator = EventGenerator(
        overall_task=task,
        llm_output=output,
        start_date=generator_start_date,
        start_time=generator_start_time,
        end_date=generator_end_date,
        end_time=generator_end_time,
        days=days_of_week
        )
    except Exception as e:
        print(e)
    
    print("\nTesting generation when not enough time a day given.")
    try:
        generator_end_time = time(hour=18, minute=30)
        days_of_week = ['M','T','F','U']
        generator = EventGenerator(
        overall_task=task,
        llm_output=output,
        start_date=generator_start_date,
        start_time=generator_start_time,
        end_date=generator_end_date,
        end_time=generator_end_time,
        days=days_of_week
        )
    except Exception as e:
        print(e)
    return

if __name__ == "__main__":
  main()
