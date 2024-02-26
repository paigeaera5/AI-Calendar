import React, {useState} from "react"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }

    return (
        <div className = "auth-form-container">
            <h2> Register </h2>
            <form className="register-form" onSubmit = {handleSubmit}>
                <label htmlFor = "name"> Full Name </label>
                <input value = {name} name="name" id="name" placeholder="full name"/>
                <label htmlFor = "email"> Email </label>
                <input value = {email} type = "email" placeholder = "youremail@domain.com" id = "email" name = "email" />
                
                <label htmlFor = "password"> Password </label>
                <input value = {pass} type = "password" placeholder = "********" id = "password" name = "password" />

                <button type = "submit"> Register </button>
            </form>
            <button className = "link-btn" onClick = {() => props.onFormSwitch('login')}> Already have an account? Login here! </button>
        </div>
    )
}