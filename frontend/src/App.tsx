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
//import GoogleLogin from 'react-google-login';
import { GoogleLogin } from 'react-google-login';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomCalendar.css';
import { gapi } from 'gapi-script';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  start: {
    date: string;
    dateTime: string;
    timeZone: string;
  };
  end: {
    date: string;
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: {
      entryPointType: string;
      uri: string;
      label: string;
    }[];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
  };
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}

interface CalEvent {
  title: string;
  start: Date;
  end: Date;
}

const theme = createTheme({
  typography: {
    fontFamily: "Gill Sans, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#F9FCFB', // Ensures text color is black (or choose a color for better visibility)
          backgroundColor: '#0f4953', // a coral color for normal state
          '&:hover': {
            backgroundColor: '#CBF5EF', // a light teal color
          },
          '&:active': {
            backgroundColor: '#FFCFD2', // a pale pink color
          },
          '&.Mui-disabled': {
            backgroundColor: '#E0E0E0', // grey
            color: '#9E9E9E', // dark grey
          }
        },
        containedPrimary: { // Assuming primary variant is being used
          '&:hover': {
            backgroundColor: '#227f8f', // Color on hover
          },
          '&.Mui-active, &.Mui-focusVisible': { // Active or focused state
            backgroundColor: '#0f4953', // Example active color
            borderColor: '#0f4953' // Change border color if necessary
          }
        },

      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#CBF5EF', // Default border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CBF5EF', // Border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CBF5EF', // Border color when focused
          }
        },
        input: {
          color: '#0F4953', // Text color
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#CBF5EF',
          '&.Mui-focused': {
            color: '#CBF5EF',
          }
        },
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: 'pink',
          backgroundColor: 'transparent',
          borderColor: '#ffcfd2', // Border color
          '&:hover': {
            backgroundColor: '#ffcfd2', // Change as needed
          },
          '&.Mui-selected': {
            backgroundColor: '#ffcfd2', // Active background color
            color: 'white', // Active text color
            '&:hover': {
              backgroundColor: '#ffcfd2', // Ensure the hover state also uses the active color
            }
          }
        }
      }
    }
  },
});


function App() {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [preEvents, setPreEvents] = useState<CalEvent[]>([]);
  const [rerender, setRerender] = useState(0);

  // const fetchAPI = async(): Promise<void> => {
  //   const response = await axios.get("http://127.0.0.1:8080/api/users");
  //   console.log(response.data.users);
  // }

  // useEffect(() => {
  //     fetchAPI();
  // }, []);

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: "120763005234-tu9n1f37g98e3pdcc3105aluslmkkjhn.apps.googleusercontent.com",
  //       scope: "https://www.googleapis.com/auth/calendar.readonly"
  //     })
  //   };

  //   gapi.load('client:auth2', start);
  // });

  
  // const fetchEvents = async() => {
  //   console.log("In fetchEvents");
  //   try {
  //     const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  //     const data = await response.json();
  //     setEvents(data.items);
  //     console.log(events);
  //   } catch (e) {
  //     console.error('Error fetching events:', e);
  //   }
  // };
  
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


  const getEvents = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');
      gapi.client.init({
        // apiKey: "AIzaSyCRMsznpjVBJl1WHQWNOKG6JV45F7Kea3E",
        clientId: "405310223043-rk44vq38nfkfavorqthup2s98nrnoe2d.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        gapi.client.calendar.events.list({
          'calendarId': 'primary'
        }).then((response: { result: { items: CalendarEvent[] } }) => {
            const calEvents = response.result.items;
            console.log(calEvents);
            const newCalEvents: CalEvent[] = calEvents
            .filter(event => event.start && event.end)
            .map((event) => ({
              title: event.summary,
              start: event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date),
              end: event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date)
            }));
            setPreEvents(newCalEvents);
            // const output: string = calEvents.reduce(
            //   (str: string, event: any): string =>
            //     `${str}${event.summary} (${
            //       event.start.dateTime || event.start.date
            //     })\n`,
            //   "Events:\n"
            // )

            // console.log(output);
        })
      });
    })
  }

  useEffect(() => {
    // This function will run after the events state has been updated
    console.log("Events have been updated:", events);
    setRerender(pre => pre + 1);
  }, [events]); // Watch for changes to the events state

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


    setTaskName("");
    setTaskType("");
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    setHoursPerDay(0.0);
    setDays({
      U: false,
      M: false,
      T: false,
      W: false,
      R: false,
      F: false,
      S: false
    });
  }

  return (   
    <ThemeProvider theme={theme}>
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
                mx: "1vw",
                my: "4vh",
                height: "8vh",
                width: "8%",
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
              }}
              >
                {/* <GoogleLogin
                  clientId="120763005234-tu9n1f37g98e3pdcc3105aluslmkkjhn.apps.googleusercontent.com" 
                  buttonText="Sign in"
                  onSuccess={(response) => {
                    console.log(response);
                    // toggleForm('dashboard');
                    fetchEvents();
                  }}
                  onFailure={(error) => console.error(error)}
                  cookiePolicy={'single_host_origin'}
                  // @ts-ignore
                  scope="https://www.googleapis.com/auth/calendar.events.readonly"
                /> */}
                
                <Button sx={{width: "100%"}} onClick={() => {getEvents()}} variant="contained">Sign In</Button>
                <Button sx={{width: "100%", my: "1vh"}} onClick={() => {console.log(preEvents); setEvents(preEvents); console.log(events);}} variant="contained">load cal</Button>
              </Box>

              <Box sx={{
                my: "10vh",
                mx: "1vw",
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
              <Box sx={{
                width: "50%",
                my: "10vh",
                height: "calc(100% - 20vh)",
                border: 3,
                borderRadius: 3,
                py: "2vh",
                px: "2vw",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}>
                <Calendar 
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                  key={rerender}
                />
              </Box>

            </Box>
          }
        </Box>
      </LocalizationProvider>    
    </ThemeProvider>
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
      {currentForm === "login" ? (
  <Login onFormSwitch={toggleForm} />
) : (
  <GoogleLogin
    clientId="120763005234-tu9n1f37g98e3pdcc3105aluslmkkjhn.apps.googleusercontent.com" 
    buttonText="Sign in with Google"
    onSuccess={(response) => {
      console.log(response);
      // toggleForm('dashboard');
    }}
    onFailure={(error) => console.error(error)}
    cookiePolicy={'single_host_origin'}
  />
)}
    </Box>
    
  );
}




// function UncheckedLogo() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
//   );
// }

// function CheckedLogo() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
//   );
// }




export default App