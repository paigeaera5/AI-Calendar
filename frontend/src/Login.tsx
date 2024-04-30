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
