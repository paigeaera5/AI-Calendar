class Task:
  def __init__(self, name : str, type : str, days, num_days, start_date, end_date, start_time, end_time, hours_per_day, num_steps, length):
    self.name = name
    self.type = type
    self.days = days
    self.num_days = num_days
    self.start_date = start_date
    self.end_date = end_date
    self.start_time = start_time
    self.end_time = end_time
    self.hours_per_day = hours_per_day
    self.num_steps = num_steps
    self.length = length

  def print(self):
    return "".format(self.name, self.type, self.days, self.num_days, self.start_date, self.end_date, self.start_time, self.end_time, self.hours_per_day, self.num_steps, self.length)
    
