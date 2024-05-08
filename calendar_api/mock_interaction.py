"""
Test llm event generation and interactions with the Google Calendar API.
"""

import os, sys
from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from calendar_api.event_service import EventsService
from calendar_api.event_generator import EventGenerator
from llm.task import Task


def main():
    """
    Show and test basic usage of the Google Calendar API.
    1. Generate events given subtask events and descriptions created by llm
    (For testing purposes, llm output was written as strings using previously
    generated output).

    2. Add these generated events to users Google Calendar and print the 
    title, start, and end of these events.

    3. Delete all but one these generated events and print out remaining 
    generated events to be deleted. (One is left to allow you to check the
    style in which the events are generated.)

    4. Demonstrate error printed when not enough time and/or days are provided.
    """
    event_service = EventsService()
    start_date = datetime.now(tz=ZoneInfo('America/Chicago'))
    start_time = datetime.combine(start_date.date(), time(hour=11, minute=30)
                                  ).replace(tzinfo=ZoneInfo('America/Chicago'))
    end_date = (start_date + timedelta(days=21)).replace(tzinfo=ZoneInfo(
                                                            'America/Chicago'))
    end_time = datetime.combine(start_date.date(), time(hour=20, minute=30)
                                ).replace(tzinfo=ZoneInfo('America/Chicago'))
    name = "assemble Gaming DeskTop"
    task = Task(
        name=name,
        type="task",
        days=['M','T','F','U'],
        num_days=4,
        start_date=start_date.strftime("%a, %d %b %Y %H:%M:%S %z"),
        end_date=end_date.strftime("%a, %d %b %Y %H:%M:%S %z"),
        start_time=start_time.strftime("%a, %d %b %Y %H:%M:%S %z"),
        end_time=end_time.strftime("%a, %d %b %Y %H:%M:%S %z"),
        hours_per_day=9,
        num_steps=12,
        length="3 weeks"
    )

    subtasks = ["""1. Research and select the appropriate components for the \
gaming desktop (time: 2 hours)""",
    "2. Purchase all necessary components (time: 4 hours)",
    "3. Install the operating system and necessary software (time: 6 hours)",
    """4. Configure and optimize the desktop for optimal performance \
(time: 8 hours)""",
    "5. Test and troubleshoot the desktop (time: 4 hours)",
    "6. Assemble the desktop (time: 2 hours)",
    """7. Finalize the desktop by adding any finishing touches \
(time: 30 minutes)"""
    ]

    descriptions = [
"""In this two-hour session, you will \
identify the type of games you want to play on the desktop. You will \
determine the required hardware specifications for these games, \
compare prices of different components to find the best deals, and \
create a list of recommended components.""",
"""During this four-hour event, you will \
visit online retailers or physical stores to purchase the selected \
components. You should ensure that all components are compatible with each \
other and verify the availability of components before making a purchase.""",
"""This event will have you \
download and install the operating system (Windows or macOS), install \
necessary drivers for the hardware components, and install games and other \
software as needed.""",
"""This event will allow you to \
adjust settings in the operating system and applications to improve \
performance. You will also update the BIOS settings for optimal performance, \
and run benchmarking tests to identify areas for improvement.""",
"""In this four-hour session, you will \
play games and run applications to test the desktop's performance. This will \
help you identify any issues or errors and troubleshoot them and allow you to \
make sure the desktop is functioning properly and meets your expectations.""",
"""This two-hour session will let you \
follow the manufacturer's instructions to assemble the desktop, \
connect all hardware components and ensure they are securely connected, and \
test the desktop to ensure it is functioning properly.""",
"""This event will give you time to \
add decorative elements such as stickers or lighting, \
connect any additional peripherals such as a keyboard or mouse, and \
test the desktop one last time to ensure everything is working properly."""
]

  
    # Step 1 described in docstring (generating events)
    generator = EventGenerator(
        task_obj=task,
        subtasks=subtasks,
        descriptions=descriptions
    )


    # Step 2 described in docstring (add events and print them)
    print("adding")
    generator.add_to_cal()

    events = event_service.list_events(
        time_min=start_date,
        time_max=end_date,
        keywords=name,
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


    # Step 3 described in docstring (delete events and print remaining)
    while len(events) != 1:
        print('\ndeleting ' + events[1]["summary"])
        event_service.delete_event(events[1]["id"])
        events = event_service.list_events(
            time_min=start_date,
            time_max=end_date,
            keywords=name,
            max_results=20
        ).get("items", [])

        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            end = event["end"].get("dateTime", event["end"].get("date"))
            print(start, end, event["summary"])

        if not events:
            print("No upcoming events found. All were deleted.")


    # Step 4 described in docstring (not enough time or days provided)
    print("\nTesting generation when not enough days given.")
    
    try:
        task.days = ['T','U']
        task.num_days = 2
        generator = EventGenerator(
        task_obj=task,
        subtasks=subtasks,
        descriptions=descriptions
        )
    except Exception as e:
        print(e)
    
    print("\nTesting generation when not enough time a day given.")
    try:
        end_time = end_time.replace(hour=18, minute=30)
        task.days = ['M','T','F','U']
        task.num_days = 4
        task.end_time = end_time.strftime("%a, %d %b %Y %H:%M:%S %z")
        generator = EventGenerator(
        task_obj=task,
        subtasks=subtasks,
        descriptions=descriptions
        )
    except Exception as e:
        print(e)

    return

if __name__ == "__main__":
  main()
