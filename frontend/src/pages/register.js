import '../App.css';
import config from '../config';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();
    const [isValid, setValid] = useState(false);
    const [isServerValid, setServerValid] = useState(true);
    const [error, setError] = useState(null); 
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [nameTyped, setNameTyped] = useState(false);
    const [usernameTyped, setUsernameTyped] = useState(false);
    const [emailTyped, setEmailTyped] = useState(false);
    const [passwordTyped, setPasswordTyped] = useState(false);
    const [password2Typed, setPassword2Typed] = useState(false);

    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password);
    const passwordMatch = password === password2;
    const nameValid = name !== '';
    const usernameValid = username !== '';

    React.useEffect(() => {
        setValid(emailValid && passwordValid && passwordMatch && nameValid && usernameValid);
    }, [emailValid, passwordValid, passwordMatch, nameValid, usernameValid]);

    async function registerRequest() {
        if (isValid) {
            try {
                const userRequest = {
                    "fullName": name,
                    "username": username,
                    "email": email,
                    "password1": password,
                    "password2": password2
                };
                const request = JSON.stringify(userRequest);
                const response = await fetch(`${config.backendUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: request
                });
                if (!response.ok) {
                    throw new Error(`Error registering: ${response.statusText}`);
                }
                const result = await response.text();
                const resultBody = JSON.parse(result);
                if (resultBody.status === "ok") {
                    setServerValid(true);
                    history.push("/login");
                } else {
                    setServerValid(false);
                    alert(resultBody.message);
                }
            } catch (error) {
                setError(error.message);
                alert(error.message);
            }
        }
    }

    if (error) {
        return <div className="error">An error occurred: {error}</div>;
    }

    return (
        <div className="AccountForm">
            <h2>You can create your account here</h2>
            <p>Account is required for you to be able to view the contents of the page</p>
            <input placeholder="Full Name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setNameTyped(true);
                }} />
            {(nameTyped && !nameValid) && <p className="error">Name is required</p>}
            <input placeholder="Username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameTyped(true);
                }} />
            {(usernameTyped && !usernameValid) && <p className="error">Username is required</p>}
            <input placeholder="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailTyped(true);
                }} />
            {(emailTyped && !emailValid) && <p className="error">Email is not valid</p>}
            <input placeholder="Password" type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordTyped(true);
                }} />
            {(passwordTyped && !passwordValid) && <p className="error">
                Password must include upper and lower case letters, special characters, and numbers</p>}
            <input placeholder="Repeat Password" type="password"
                value={password2}
                onChange={(e) => {
                    setPassword2(e.target.value);
                    setPassword2Typed(true);
                }} />
            {(!isServerValid) && <p className="error">This password or email already exists</p>}
            {(password2Typed && !passwordMatch) && <p className="error">Passwords do not match</p>}
            {isValid ?
                <button className="FormButton" onClick={registerRequest}>Register</button> :
                <button className="FormButtonInvalid">Register</button>}
            <p>Already have an account? You can log in <Link className="link" to="/login">here</Link>.</p>
        </div>
    );
}

export default Register;
