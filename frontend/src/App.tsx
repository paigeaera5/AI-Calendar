import React, { useState } from "react";
import './App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Login } from "./Login.tsx";
import { Register } from "./Register.tsx";

function App() {
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

      <Box>
        { currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> }
      </Box>

      {/* <Box sx={{ 
        mx: "2vw",
        my: "4vh",
        height: "8vh",
        // borderWidth: 1, 
        // borderColor: "white", 
        // borderStyle: "solid",
        display: "flex",
        justifyContent: "right"
      }}
      >
        <Button sx={{width: "10%"}} variant="contained">Sign In</Button>
      </Box> */}

    </Box>
  );
}

export default App
