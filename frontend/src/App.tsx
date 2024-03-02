import React, { FC, useState } from "react";
import './App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Login } from "./Login.tsx";
import { Register } from "./Register.tsx";
import { useNavigate } from 'react-router-dom';


function App() {
  const [logReg, setLogReg] = useState(false);

  return (    
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
            width: "10%",
            display: "flex",
            justifyContent: "right"
          }}
          >
            <Button sx={{width: "100%"}} onClick={() => {setLogReg(!logReg)}} variant="contained">Sign In</Button>
          </Box>

          <Box sx={{
            my: "16vh",
            mx: "2vw",
            height: "calc(100% - 32vh)",
            width: "15%",
            border: 3,
            borderRadius: 3,
            py: "2vh",
            px: "2vw"
          }}
          >
            
          </Box>
        </Box>
      }
    </Box>
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


export default App
