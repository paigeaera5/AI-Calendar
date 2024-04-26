import React, { FC, useState,useEffect } from "react";
import './App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Login } from "./Login.tsx";
import { Register } from "./Register.tsx";
// import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { MondayUnchecked, TuesdayUnchecked, WednesdayUnchecked, ThursdayUnchecked, FridayUnchecked, SaturdayUnchecked, SundayUnchecked } from "./CheckIcons.tsx";
import { MondayChecked, TuesdayChecked, WednesdayChecked, ThursdayChecked, FridayChecked, SaturdayChecked, SundayChecked } from "./CheckIcons.tsx";
// import {MondayUnchecked, MondayChecked, TuesdayUnchecked, TuesdayChecked} from "./CheckIcons.tsx";
// import { FormControl, FormLabel } from '@mui/material';
// import { createStyles, withStyles } from '@mui/material/styles'
import './styles/main.scss'
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// import RadioButtonUncheckedIcon from '@mui/material/Icon/RadioButtonUnchecked';
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs";
import axios from "axios";

function App() {
  const fetchAPI = async(): Promise<void> => {
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    console.log(response.data.users);
  }

  useEffect(() => {
      fetchAPI();
  }, []);
  
  const [logReg, setLogReg] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
  
  const [hoursPerDay, setHoursPerDay] = useState(0.0);

  // Checkbox Group
  const [days, setDays] = useState({
    U: false,
    M: false,
    T: false,
    W: false,
    R: false,
    F: false,
    S: false
  });

  const { U, M, T, W, R, F, S } = days;

  const handleDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays({ ...days, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log('taskName: ', taskName)
    // console.log('taskType: ', taskType)
    const daysChecked = Object.values(days).filter(value => value).length;
    const daysListHelper = Object.values(days);
    const daysLabels : string[] = ["U", "M", "T", "W", "R", "F", "S"];
    const daysList : string[] = [];
    daysListHelper.forEach((value, i) => {
      if (value) { daysList.push(daysLabels[i]); }
    });
    
    // console.log('Days of Week Checked: ', daysChecked)
    // console.log('Sunday: ', U)
    // console.log('Monday: ', M)
    // console.log('Tuesday: ', T)
    // console.log('Wednesday: ', W)
    // console.log('Thursday: ', R)
    // console.log('Friday: ', F)
    // console.log('Saturday: ', S)
    // if (startDate) {
    //   console.log('Start Date: ', startDate.toDate());
    // } else { console.log('Please enter start date'); }
    // if (endDate) {
    //   console.log('End Date: ', endDate.toDate());
    // } else { console.log('Please enter end date'); }

    // if (startTime) {
    //   console.log('Start Time: ', startTime.toDate());
    // } else { console.log('Please enter start time'); }
    // if (endTime) {
    //   console.log('End Time: ', endTime.toDate());
    // } else { console.log('Please enter end time'); }
    // console.log('Hours per Day: ', hoursPerDay);

    axios.post("http://127.0.0.1:8080/acceptInput", { 
      task_name: taskName, 
      task_type: taskType,
      num_days: daysChecked,
      days: JSON.stringify(daysList),
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      hours_per_day: hoursPerDay,
      u: U,

    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (   
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <Box>
        {logReg ? <LogReg /> :
          <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row-reverse",
          }} 
          >
            <Box sx={{ 
              mx: "2vw",
              my: "4vh",
              height: "8vh",
              width: "8%",
              display: "flex",
              justifyContent: "right"
            }}
            >
              <Button sx={{width: "100%"}} onClick={() => {setLogReg(!logReg)}} variant="contained">Sign In</Button>
            </Box>

            <Box sx={{
              my: "10vh",
              mx: "2vw",
              height: "calc(100% - 20vh)",
              maxHeight: "500px",
              width: "25%",
              border: 3,
              borderRadius: 3,
              py: "2vh",
              px: "2vw",
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            >
              <form 
                onSubmit={handleSubmit}
                method="post"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <TextField 
                  label="Task Name"
                  id="task_name"
                  required
                  variant="outlined"
                  onChange={e=>setTaskName(e.target.value)}
                  value={taskName}
                  // className="custom-textfield"
                  // color='primary'
                  sx={{
                    my: '2%',
                    color: 'white',
                    '& .MuiFormLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputBase-root': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiInputBase-root': {
                      borderColor: 'white',
                    },
                    '& .MuiOutlineInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlineInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  }}
                />

                <TextField 
                  label="Task Type"
                  required
                  variant="outlined"
                  onChange={e=>setTaskType(e.target.value)}
                  value={taskType}
                  // className="custom-textfield"
                  // color='primary'
                  sx={{
                    my: '2%',
                    color: 'white',
                    '& .MuiFormLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputBase-root': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiInputBase-root': {
                      borderColor: 'white',
                    },
                    '& .MuiOutlineInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlineInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  }}
                />

                <FormGroup
                  sx={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<SundayUnchecked />} 
                        checkedIcon={<SundayChecked/>} 
                        checked={U}
                        onChange={handleDays}
                        name="U"
                      />
                    } 
                    label="" 
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<MondayUnchecked />} 
                        checkedIcon={<MondayChecked/>}
                        checked={M}
                        onChange={handleDays}
                        name="M"
                      />
                    } 
                    label="" 
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<TuesdayUnchecked />} 
                        checkedIcon={<TuesdayChecked/>}
                        checked={T}
                        onChange={handleDays}
                        name="T"
                      />
                    } 
                    label="" 
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<WednesdayUnchecked />} 
                        checkedIcon={<WednesdayChecked/>}
                        checked={W}
                        onChange={handleDays}
                        name="W"
                      />
                    } 
                    label="" 
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<ThursdayUnchecked />} 
                        checkedIcon={<ThursdayChecked/>}
                        checked={R}
                        onChange={handleDays}
                        name="R"
                      />
                    } 
                    label="" />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<FridayUnchecked />} 
                        checkedIcon={<FridayChecked/>}
                        checked={F}
                        onChange={handleDays}
                        name="F"
                      />
                    } 
                    label="" 
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        icon={<SaturdayUnchecked />} 
                        checkedIcon={<SaturdayChecked/>}
                        checked={S}
                        onChange={handleDays}
                        name="S"
                      />
                    } 
                    label="" 
                  />
                </FormGroup>

                <FormGroup
                  sx={{
                    my: '2vh',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <DatePicker 
                    onChange={(date)=>setStartDate(date)}
                    value={startDate}
                    
                    sx={{
                      width: '40%', 
                      mx: '1vw',
                      color: '#ffffff',
                      border: 'none',
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiFormLabel-root': {
                        color: 'white',
                        borderColor: '#ffffff',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                      '&:hover .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                    }}

                    label="Start"
                  />

                  <DatePicker 
                    onChange={(date)=>setEndDate(date)}
                    value={endDate}

                    sx={{
                      width: '40%', 
                      mx: '1vw',
                      color: '#ffffff',
                      border: 'none',
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiFormLabel-root': {
                        color: 'white',
                        borderColor: '#ffffff',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                      '&:hover .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                      '&:focus .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ffffff',
                        }
                      },
                    }}

                    label="End"
                  />
                </FormGroup>

                <FormGroup
                  sx={{
                    my: '3%',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <TimePicker 
                    onChange={(time)=>setStartTime(time)}
                    value={startTime}

                    sx={{
                      width: '40%', 
                      mx: '1vw',
                      color: '#ffffff',
                      border: 'none',
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiFormLabel-root': {
                        color: 'white',
                        borderColor: '#ffffff',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                      '&:hover .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                    }}

                    label="From"
                  />

                  <TimePicker 
                    onChange={(time)=>setEndTime(time)}
                    value={endTime}

                    sx={{
                      width: '40%', 
                      mx: '1vw',
                      color: '#ffffff',
                      border: 'none',
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiFormLabel-root': {
                        color: 'white',
                        borderColor: '#ffffff',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                      '&:hover .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Set the border color to white
                        },
                      },
                      '&:focus .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ffffff',
                        }
                      },
                    }}

                    label="To"
                  />
                </FormGroup>

                <TextField 
                  onChange={e=>setHoursPerDay(parseFloat(e.target.value))}
                  value={hoursPerDay}
                  
                  label="Hours per Day"
                  required
                  variant="outlined"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // className="custom-textfield"
                  // color='primary'
                  sx={{
                    my: '3%',
                    color: 'white',
                    '& .MuiFormLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputBase-root': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiInputBase-root': {
                      borderColor: 'white',
                    },
                    '& .MuiOutlineInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlineInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  }}
                />

                <Button type="submit" variant="contained" sx={{fontWeight: '600', height: '6vh', borderRadius: '5px'}}>Generate Schedule</Button>

              </form>
            </Box>
          </Box>
        }
      </Box>
    </LocalizationProvider>
  );
}

function LogReg() {
  const [currentForm, setCurrentForm] = useState<string>('login');

  const toggleForm = (formName: string) => {
    setCurrentForm(formName);
  }

  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    }}
    >
      { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> }
    </Box>
  );
}

function UncheckedLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
  );
}

function CheckedLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
  );
}


export default App
