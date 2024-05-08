/*

import React, { useState, FC, FormEvent } from "react";
import { GoogleLogin } from 'react-google-login';

interface LoginProps {
  onFormSwitch: (form: string) => void;  // Function to toggle forms
  onGoogleLoginSuccess: (response: any) => void;  // Handle Google login success
}

export const Login: FC<LoginProps> = ({ onFormSwitch, onGoogleLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);  // Log email and password for debugging
    // Implement your authentication logic here
  };

  const handleGoogleSuccess = (response: any) => {
    console.log("Google login success:", response);
    onGoogleLoginSuccess(response);  // Propagate the success handling
  };

  const handleGoogleFailure = (response: any) => {
    console.log("Google login failed:", response);
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@domain.com" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="************" />

        <button type="submit">Login</button>
      </form>

      <GoogleLogin
        clientId="120763005234-tu9n1f37g98e3pdcc3105aluslmkkjhn.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />

      <button className="link-btn" onClick={() => onFormSwitch('register')}>
        Don't have an account? Register here!
      </button>
    </div>
  );
};


export default Login;
*/

import React, { useState, FC, FormEvent } from "react";

interface LoginProps {
  onFormSwitch: (form: string) => void;
}

export const Login: FC<LoginProps> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="auth-form-container">
      <h2> Login </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email"> Email </label>
        <input defaultValue="" type="email" placeholder="youremail@domain.com" id="email" name="email" />

        <label htmlFor="password"> Password </label>
        <input defaultValue="" type="password" placeholder="************" id="password" name="password" />

        <button type="submit"> Login </button>
      </form>
      <button className="link-btnn" onClick={() => props.onFormSwitch('register')}> Don't have an account? Register here! </button>
    </div>
  );
}

export default Login;

/*
import React from 'react';
import { GoogleLogin } from 'react-google-login';


interface LoginProps {
  onFormSwitch: (form: string) => void;
}

const responseGoogle = (response: any) => {
  console.log(response);
};

const App = () => {
  return (
    <div>
      <GoogleLogin
        clientId="YOUR_CLIENT_ID" // Replace with your actual client ID
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default App;
*/