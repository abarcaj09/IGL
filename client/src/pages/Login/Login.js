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
    <div className="auth">
      <div className="login-container">
        <div className="login-top">
          <div className="auth-logoContainer">
            <img className="auth-logo" src="/igl-logo.png" alt="logo" />
          </div>

          <div className="login-form">
            <form onSubmit={onSubmit}>
              <div className="auth-input">
                <label>Username or email</label>
                <input
                  type="text"
                  name="account"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  autoFocus
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
                disabled={!account || password.length < 6}
                type="submit"
              >
                Log In
              </button>

              {error && (
                <div className="auth-error">
                  <h3>{error}</h3>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="auth-bottom">
          <p>
            Don't have an account?
            <Link to="/accounts/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
