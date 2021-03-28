import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => {
    return auth.error;
  });

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ account, password }));
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-top">
          <div className="login-logoContainer">
            <img className="login-logo" src="/igl-logo.png" alt="logo" />
          </div>

          <div className="login-form">
            <form onSubmit={onSubmit}>
              <div className="login-input">
                <label>Username or email</label>
                <input
                  type="text"
                  name="account"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="login-input">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="login-button"
                disabled={!account || password.length < 6}
                type="submit"
              >
                Log In
              </button>

              {error && (
                <div className="login-error">
                  <h3>{error}</h3>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="login-bottom">
          <p>
            Don't have an account?
            <Link to="/accounts/register" className="login-registerLink">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
