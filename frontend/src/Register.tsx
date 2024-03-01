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
