import "./Register.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => {
    return auth.error;
  });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonDisabled = () => {
    return !email || !name || !username || password.length < 6;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, name, username, password }));
  };

  return (
    <div className="auth">
      <div className="register-container">
        <div className="register-top">
          <div className="auth-logoContainer">
            <img className="auth-logo" src="/igl-logo.png" alt="logo" />
          </div>

          <div className="register-message">
            <h2>Sign up to see photos from your friends.</h2>
          </div>

          <div className="register-form">
            <form onSubmit={onSubmit}>
              <div className="auth-input">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="auth-input">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="auth-input">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="auth-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="auth-button"
                disabled={buttonDisabled()}
                type="submit"
              >
                Sign Up
              </button>

              {/* Display all error messages */}
              {error && (
                <div className="auth-error">
                  {error.map((err, index) => (
                    <h3 key={index}>{err}</h3>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="auth-bottom">
          <p>
            Have an account?
            <Link to="/accounts/login" className="auth-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
