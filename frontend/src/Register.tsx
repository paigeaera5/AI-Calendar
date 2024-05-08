import React, { useState, FC, FormEvent } from "react";
import { GoogleLogin } from 'react-google-login';

const googleButton = (GoogleLogin as any) as JSX.Element;

interface RegisterProps {
  onFormSwitch: (form: string) => void;
  onGoogleLoginSuccess: (response: any) => void; // Add a prop for handling Google login success
}

export const Register: FC<RegisterProps> = ({ onFormSwitch, onGoogleLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);
  }

  const handleGoogleSuccess = (response: any) => {
    console.log("Google login success:", response);
    onGoogleLoginSuccess(response); // Handle the successful response
  };

  const handleGoogleFailure = (response: any) => {
    console.log("Google login failed:", response);
  };

  return (
    <div className="auth-form-container">
      <h2> Register </h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input defaultValue="" name="name" id="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input defaultValue="" type="email" placeholder="youremail@domain.com" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input defaultValue="" type="password" placeholder="************" id="password" name="password" onChange={(e) => setPass(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <GoogleLogin
        clientId="120763005234-tu9n1f37g98e3pdcc3105aluslmkkjhn.apps.googleusercontent.com"
        buttonText="Register with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
      <button className="link-btn" onClick={() => onFormSwitch('login')}>Already have an account? Login here!</button>
    </div>
  );
}

export default Register;

/*
import React, { useState, FC, FormEvent } from "react";

interface RegisterProps {
  onFormSwitch: (form: string) => void;
}

export const Register: FC<RegisterProps> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="auth-form-container">
      <h2> Register </h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name"> Full Name </label>
        <input defaultValue="" name="name" id="name" placeholder="Full Name" />
        <label htmlFor="email"> Email </label>
        <input defaultValue="" type="email" placeholder="youremail@domain.com" id="email" name="email" />

        <label htmlFor=""> Password </label>
        <input defaultValue="" type="password" placeholder="************" id="password" name="password" />

        <button type="submit"> Register </button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here! </button>
    </div>
  )
}

export default Register;
*/