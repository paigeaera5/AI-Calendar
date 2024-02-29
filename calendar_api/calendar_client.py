"""CalendarClient object for working with Google Calendar API."""

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


class CalendarClient:
    """Class for storing calendar client setup."""

    SCOPES = ["https://www.googleapis.com/auth/calendar"]
    creds = None
    service = None

    def __init__(self) -> None:
        """Initialize API client with credentials and calendar object."""
        self.creds = self._authenticate()

        try:
            self.service = build("calendar", "v3", credentials=self.creds)
        except HttpError as error:
            print(f"An error occurred: {error}")

    def _authenticate(self) -> Credentials:
        """Authenticate user with Google Calendar API.

        Checks if token.json exists. If it does, the user's credentials are
        loaded. If there are no (valid) credentials, the user can log in.

        The file token.json is created automatically when the authorization
        completes for the first time, and stores the user's access and
        refresh tokens

        Returns the credentials.
        """
        if os.path.exists("token.json"):
            creds = Credentials.from_authorized_user_file("token.json",
                                                          self.SCOPES)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    "calendar_api/credentials.json", self.SCOPES
                )
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open("token.json", "w") as token:
                token.write(creds.to_json())

        return creds