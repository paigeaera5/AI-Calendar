# AI Calendar Planner

This app is a tool to build the perfect schedule for creating big projects. It collects the project description, deadline, and user preferred days and time to…
* Prompt the LLM to generate manageable subtasks and descriptions
* Find availability in current Google Calendar schedule
* Create and add events to user’s calendar

## Motivation

Creating a big project takes time and consistency. We wanted to create a tool to assist in splitting up the task and making it more manageable. The aim is to make it so you don’t need to worry about meeting deadline or forgetting about projects.


# Technical Architecture

![cs222 diagram (3)](https://github.com/CS222-UIUC-SP24/group-project-team-29/assets/73445535/0c6ffbb6-f12e-45a3-9568-ea13eee6acc4)


# Environment Setup

You are first going to want to clone the repository and ensure you have `pip` and `python` installed.

## Create a virtual environment

To create a virtual environment for this project, run the following command.
```
python3 -m venv ./venv
```

## Activate venv

Once you’ve created the virtual environment, you should activate it.

### Unix/MacOS
```
source venv/bin/activate
```

### Windows
```
venv\Scripts\activate
```

## Install Requirements

Now you can install the packages used in this project by running the following:
```
pip install -r requirements.txt
```


# Project Instruction

The following instructions are to configure each component needed involved in this project.

## Google Calendar API Setup

1. Register Google Cloud account, if not already.
2. Create a new Google Cloud project and enable the Google Calendar API.
([Enable API here](https://console.cloud.google.com/flows/enableapi?apiid=calendar-json.googleapis.com))
3. Configure the OAuth consent screen
([Configure OAuth here](https://console.cloud.google.com/apis/credentials/consent))
    * Select **Interal** for **User Type**.
    * Can skip scopes for now.
4. Click **Create credentials > OAuth client ID**.
([Go to credentials](https://console.cloud.google.com/apis/credentials))
    * Click **Application type > Desktop app**
    * After setting the Name field to a name of your choosing, click **Create**
5. Download JSON
    * Save the downloaded JSON file as `credentials.json`, and move the file to your working directory.
  
More detailed instructions can be found here: [Calendar API Quickstart](https://developers.google.com/calendar/api/quickstart/python)

## LLM Setup
1. Clone the repository
2. Make sure `pip` and `python` are installed on your machine
3. Create a virtual environment and activate it
    ```
    python3 -m venv 222llmenv
    ```
    if using ubuntu
    ```
    source 222llmenv/bin/activate
    ```

    if using windows
    ```
    222llmenv\Scripts\activate
    ```

4. Install the requirements using `pip install -r requirements.txt`


# Developers
* Paige Lee (Worked on Google Calendar API implementation)
* 
