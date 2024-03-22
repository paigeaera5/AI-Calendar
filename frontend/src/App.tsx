import React, { FC, useState } from "react";
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


function App() {
  const [logReg, setLogReg] = useState(false);

  // const styles = () =>
  //   createStyles({
  //     root: {
  //       '& label.Mui-focused': {
  //         color: 'white',
  //       },
  //       '& .MuiInputBase-input': {
  //         color: 'white',
  //       },
  //       '& .MuiOutlinedInput-root': {
  //         '& fieldset': {
  //           borderColor: 'white',
  //         },
  //         '&:hover fieldset': {
  //           borderColor: 'white',
  //         },
  //         '&.Mui-focused fieldset': {
  //           borderColor: 'white',
  //         },
  //       },
  //     },
  //   });

  // const CustomTextField = withStyles(styles)(TextField);

  return (   
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <Box>
        {logReg ? <LogReg /> :
          <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row-reverse"
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
              my: "12vh",
              mx: "2vw",
              height: "calc(100% - 24vh)",
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
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <TextField 
                  label="Task Name"
                  required
                  variant="outlined"
                  // className="custom-textfield"
                  // color='primary'
                  sx={{
                    my: '5%',
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
                  <FormControlLabel control={<Checkbox icon={<SundayUnchecked />} checkedIcon={<SundayChecked/>}/>} label="" />
                  <FormControlLabel control={<Checkbox icon={<MondayUnchecked />} checkedIcon={<MondayChecked/>}/>} label="" />
                  <FormControlLabel control={<Checkbox icon={<TuesdayUnchecked />} checkedIcon={<TuesdayChecked/>}/>} label="" />
                  <FormControlLabel control={<Checkbox icon={<WednesdayUnchecked />} checkedIcon={<WednesdayChecked/>}/>} label="" />
                  <FormControlLabel control={<Checkbox icon={<ThursdayUnchecked />} checkedIcon={<ThursdayChecked/>}/>} label="" />
                  <FormControlLabel control={<Checkbox icon={<FridayUnchecked />} checkedIcon={<FridayChecked/>}/>} label="" />
                  <FormControlLabel control={<Checkbox icon={<SaturdayUnchecked />} checkedIcon={<SaturdayChecked/>}/>} label="" />
                </FormGroup>

                <FormGroup
                  sx={{
                    my: '2vh',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <DatePicker 
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
                    my: '2vh',
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <TimePicker 
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
                    my: '5%',
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

                <Button variant="contained" sx={{fontWeight: '600', height: '6vh', borderRadius: '5px'}}>Generate Schedule</Button>

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
