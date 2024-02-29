import React, {useState} from "react"
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login.js";
import { Register } from "./Register.js";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm == "login" ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm} />
      }
    </div>
  );
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
@ -40,6 +21,5 @@ function App() {
    </div>
  );
}
*/

export default App;