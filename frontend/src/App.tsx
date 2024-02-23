// import './App.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function App() {
  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    }}
    >

      <Box sx={{ 
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
      </Box>

    </Box>
  );
}

export default App
