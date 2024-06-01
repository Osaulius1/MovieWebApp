import '../App.css';
import { Link, useHistory } from 'react-router-dom';
import React, { useRef } from 'react';
import { useState } from 'react';
import config from '../config'; 

function Login() {
  const history = useHistory();
  const [isServerValid, setServerValid] = useState(true);
  const [isValid, setValid] = useState(false);
  const [usernameValid, validateUsername] = useState(false);
  const [passwordValid, ValidatePass] = useState(false);
  const [passwordTyped, TypePassword] = useState(false);
  const [usernameTyped, TypeUsername] = useState(false);
  const passwordRef = useRef();
  const usernameRef = useRef();
  const [error, setError] = useState(null); 

  function checkPassword() {
    ValidatePass(passwordRef.current.value !== '');
    TypePassword(true);
    setValid(passwordValid && usernameValid);
  }

  function checkUsername() {
    TypeUsername(true);
    validateUsername(usernameRef.current.value !== '');
    setValid(passwordValid && usernameValid);
  }

  async function loginRequest() {
    try {
      const userRequest = {
        usernameOrEmail: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      const request = JSON.stringify(userRequest);
      const response = await fetch(`${config.backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: request,
      });
      if (!response.ok) {
        throw new Error(`Error logging in: ${response.statusText}`);
      }
      const result = await response.text();
      const resultBody = JSON.parse(result);
      if (resultBody.status === 'ok') {
        setServerValid(true);
        localStorage.setItem('sessionKey', resultBody.sessionKey); 
        history.push('/home');
      } else {
        setServerValid(false);
        alert(resultBody.message);
      }
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  }

  if (error) {
    return <div className="error">An error occurred: {error}</div>;
  }

  return (
    <div className="AccountForm">
      <h2>You can log in here</h2>
      <p>Account is required for you to be able to view the contents of the page</p>
      <input
        placeholder="Username or Email"
        ref={usernameRef}
        onBlur={checkUsername}
        onChange={checkUsername}
      />
      {usernameTyped && !usernameValid && <p className="error">username or email is required</p>}
      <input
        ref={passwordRef}
        placeholder="Password"
        type="password"
        onChange={checkPassword}
        onBlur={checkPassword}
      />
      {!isServerValid && <p className="error">The email or password is wrong</p>}
      {passwordTyped && !passwordValid && <p className="error">Password is required</p>}
      {isValid ? (
        <button className="FormButton" onClick={loginRequest}>
          Login
        </button>
      ) : (
        <button className="FormButtonInvalid">Login</button>
      )}
      <p>
        Do not have an account yet? You can create one{' '}
        <Link className="link" to="register">
          here
        </Link>
        .
      </p>
    </div>
  );
}

export default Login;
