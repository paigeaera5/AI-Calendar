from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os, sys
from task import Task
from datetime import datetime
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from calendar_api.event_generator import EventGenerator
from llmpromptingclass import LLMPrompter
import logging

cal_task = Task("", "", [], 0, "", "", "", "", 0, 0, "")
app = Flask(__name__)
CORS(app, origins='*')

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.INFO)
logger.addHandler(file_handler)


@app.route("/api/users", methods=['GET'])
def users():
    return jsonify({
        "users": ["gina", "bina", "tina"]
    })

@app.route("/acceptInput", methods=['POST'])
def get_input():
    global cal_task
    task_name = request.form.get("task_name")
    task_type = request.form.get("task_type")
    num_days = request.form.get("num_days")
    days = request.form.get("days")
    start_date = request.form.get("start_date")
    end_date = request.form.get("end_date")
    start_time = request.form.get("start_time")
    end_time = request.form.get("end_time")
    hours_per_day = request.form.get("hours_per_day")

    start_dt = datetime.strptime(start_date, "%a, %d %b %Y %H:%M:%S %Z")
    end_dt = datetime.strptime(end_date, "%a, %d %b %Y %H:%M:%S %Z")
    duration = abs(end_dt - start_dt).days + 1
    num_months = int(duration / 30)
    num_weeks = int(((duration) - (num_months * 30)) / 7)
    num_days_left = duration - (num_weeks * 7) - (num_months * 30)

    num_steps = int(num_days) * 4

    if duration < 30:
        num_steps = int(num_days) * num_weeks

    length = str(num_months) + " months, " + str(num_weeks) + " weeks, " + str(num_days_left) + " days"
    
    cal_task = Task(task_name, task_type, days, num_days, start_date, end_date, start_time, end_time, int(hours_per_day), num_steps, length)
    llm_obj = LLMPrompter(task_name, num_steps, length, hours_per_day)

    try:
        generator = EventGenerator(task_obj=cal_task, subtasks=llm_obj.events, descriptions=llm_obj.event_descriptions)
        generator.add_to_cal()
    except AssertionError as e:
        return e, # Return error if not enough time available
    
    return "Received task successfully", 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)
