"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var Box_1 = require("@mui/material/Box");
var Button_1 = require("@mui/material/Button");
var Login_tsx_1 = require("./Login.tsx");
var Register_tsx_1 = require("./Register.tsx");
// import { useNavigate } from 'react-router-dom';
var TextField_1 = require("@mui/material/TextField");
var CheckIcons_tsx_1 = require("./CheckIcons.tsx");
var CheckIcons_tsx_2 = require("./CheckIcons.tsx");

// import {MondayUnchecked, MondayChecked, TuesdayUnchecked, TuesdayChecked} from "./CheckIcons.tsx";
// import { FormControl, FormLabel } from '@mui/material';
// import { createStyles, withStyles } from '@mui/material/styles'
require("./styles/main.scss");
var material_1 = require("@mui/material");
// import RadioButtonUncheckedIcon from '@mui/material/Icon/RadioButtonUnchecked';
var x_date_pickers_1 = require("@mui/x-date-pickers");
var AdapterDayjs_1 = require("@mui/x-date-pickers/AdapterDayjs");
function App() {
    var _a = (0, react_1.useState)(false), logReg = _a[0], setLogReg = _a[1];
    var _b = (0, react_1.useState)(""), taskName = _b[0], setTaskName = _b[1];
    var _c = (0, react_1.useState)(""), taskType = _c[0], setTaskType = _c[1];
    var _d = (0, react_1.useState)(null), startDate = _d[0], setStartDate = _d[1];
    var _e = (0, react_1.useState)(null), endDate = _e[0], setEndDate = _e[1];
    var _f = (0, react_1.useState)(null), startTime = _f[0], setStartTime = _f[1];
    var _g = (0, react_1.useState)(null), endTime = _g[0], setEndTime = _g[1];
    var _h = (0, react_1.useState)(0.0), hoursPerDay = _h[0], setHoursPerDay = _h[1];
    // Checkbox Group
    var _j = (0, react_1.useState)({
        U: false,
        M: false,
        T: false,
        W: false,
        R: false,
        F: false,
        S: false
    }), days = _j[0], setDays = _j[1];
    var U = days.U, M = days.M, T = days.T, W = days.W, R = days.R, F = days.F, S = days.S;
    var handleDays = function (e) {
        var _a;
        setDays(__assign(__assign({}, days), (_a = {}, _a[e.target.name] = e.target.checked, _a)));
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        console.log('taskName: ', taskName);
        console.log('taskType: ', taskType);
        var daysChecked = Object.values(days).filter(function (value) { return value; }).length;
        console.log('Days of Week Checked: ', daysChecked);
        console.log('Sunday: ', U);
        console.log('Monday: ', M);
        console.log('Tuesday: ', T);
        console.log('Wednesday: ', W);
        console.log('Thursday: ', R);
        console.log('Friday: ', F);
        console.log('Saturday: ', S);
        if (startDate) {
            console.log('Start Date: ', startDate.toDate());
        }
        else {
            console.log('Please enter start date');
        }
        if (endDate) {
            console.log('End Date: ', endDate.toDate());
        }
        else {
            console.log('Please enter end date');
        }
        if (startTime) {
            console.log('Start Time: ', startTime.toDate());
        }
        else {
            console.log('Please enter start time');
        }
        if (endTime) {
            console.log('End Time: ', endTime.toDate());
        }
        else {
            console.log('Please enter end time');
        }
        console.log('Hours per Day: ', hoursPerDay);
    };
    return (<x_date_pickers_1.LocalizationProvider dateAdapter={AdapterDayjs_1.AdapterDayjs}> 
      <Box_1.default>
        {logReg ? <LogReg onBack={() => setLogReg(false)}  /> :
            <Box_1.default sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "row-reverse",
                }}>
            <Box_1.default sx={{
                    mx: "2vw",
                    my: "4vh",
                    height: "8vh",
                    width: "8%",
                    display: "flex",
                    justifyContent: "right"
                }}>
              <Button_1.default sx={{ width: "100%" }} onClick={function () { setLogReg(!logReg); }} variant="contained">Sign In</Button_1.default>
            </Box_1.default>

            <Box_1.default sx={{
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
                }}>
              <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                <TextField_1.default label="Task Name" required variant="outlined" onChange={function (e) { return setTaskName(e.target.value); }} value={taskName} 
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
                }}/>

                <TextField_1.default label="Task Type" required variant="outlined" onChange={function (e) { return setTaskType(e.target.value); }} value={taskType} 
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
                }}/>

                <material_1.FormGroup sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.SundayUnchecked />} checkedIcon={<CheckIcons_tsx_2.SundayChecked />} checked={U} onChange={handleDays} name="U"/>} label=""/>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.MondayUnchecked />} checkedIcon={<CheckIcons_tsx_2.MondayChecked />} checked={M} onChange={handleDays} name="M"/>} label=""/>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.TuesdayUnchecked />} checkedIcon={<CheckIcons_tsx_2.TuesdayChecked />} checked={T} onChange={handleDays} name="T"/>} label=""/>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.WednesdayUnchecked />} checkedIcon={<CheckIcons_tsx_2.WednesdayChecked />} checked={W} onChange={handleDays} name="W"/>} label=""/>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.ThursdayUnchecked />} checkedIcon={<CheckIcons_tsx_2.ThursdayChecked />} checked={R} onChange={handleDays} name="R"/>} label=""/>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.FridayUnchecked />} checkedIcon={<CheckIcons_tsx_2.FridayChecked />} checked={F} onChange={handleDays} name="F"/>} label=""/>
                  <material_1.FormControlLabel control={<material_1.Checkbox icon={<CheckIcons_tsx_1.SaturdayUnchecked />} checkedIcon={<CheckIcons_tsx_2.SaturdayChecked />} checked={S} onChange={handleDays} name="S"/>} label=""/>
                </material_1.FormGroup>

                <material_1.FormGroup sx={{
                    my: '2vh',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                  <x_date_pickers_1.DatePicker onChange={function (date) { return setStartDate(date); }} value={startDate} sx={{
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
                }} label="Start"/>

                  <x_date_pickers_1.DatePicker onChange={function (date) { return setEndDate(date); }} value={endDate} sx={{
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
                }} label="End"/>
                </material_1.FormGroup>

                <material_1.FormGroup sx={{
                    my: '3%',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                  <x_date_pickers_1.TimePicker onChange={function (time) { return setStartTime(time); }} value={startTime} sx={{
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
                }} label="From"/>

                  <x_date_pickers_1.TimePicker onChange={function (time) { return setEndTime(time); }} value={endTime} sx={{
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
                }} label="To"/>
                </material_1.FormGroup>

                <TextField_1.default onChange={function (e) { return setHoursPerDay(parseFloat(e.target.value)); }} value={hoursPerDay} label="Hours per Day" required variant="outlined" type="number" InputLabelProps={{
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
                }}/>

                <Button_1.default type="submit" variant="contained" sx={{ fontWeight: '600', height: '6vh', borderRadius: '5px' }}>Generate Schedule</Button_1.default>

              </form>
            </Box_1.default>
          </Box_1.default>}
      </Box_1.default>
    </x_date_pickers_1.LocalizationProvider>);
}

function LogReg({ onBack }) {
    const [currentForm, setCurrentForm] = useState('login');

    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            flexDirection: "column"
        }}>
            <Button onClick={onBack}>Back</Button>
            {currentForm === "login" ? <Login onFormSwitch={setCurrentForm}/> : <Register onFormSwitch={setCurrentForm}/>}
        </Box>
    );
}

export default App;

function LogReg() {
    var _a = (0, react_1.useState)('login'), currentForm = _a[0], setCurrentForm = _a[1];
    var toggleForm = function (formName) {
        setCurrentForm(formName);
    };
    return (<Box_1.default sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
      {currentForm === "login" ? <Login_tsx_1.Login onFormSwitch={toggleForm}/> : <Register_tsx_1.Register onFormSwitch={toggleForm}/>}
    </Box_1.default>);
}
function UncheckedLogo() {
    return (<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>);
}
function CheckedLogo() {
    return (<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>);
}
exports.default = App;
