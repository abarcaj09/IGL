import "./Register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonDisabled = () => {
    return !email || !name || !username || password.length < 6;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Submitting: name=${name}, username=${username}, email=${email}, password=${password}`
    );
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-top">
          <div className="register-logoContainer">
            <img className="register-logo" src="/igl-logo.png" alt="logo" />
          </div>

          <div className="register-message">
            <h2>Sign up to see photos from your friends.</h2>
          </div>

          <div className="register-form">
            <form onSubmit={onSubmit}>
              <div className="register-input">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="register-input">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="register-input">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="register-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="register-button"
                disabled={buttonDisabled()}
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="register-bottom">
          <p>
            Have an account?
            <Link to="/accounts/login" className="register-loginLink">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
