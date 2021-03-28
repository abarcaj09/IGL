import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// Auth routes will redirect the user to the home page
// if they are logged in. Otherwise, the login or
// register pages is rendered

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(({ auth }) => {
    return auth.user;
  });

  return (
    <Route
      {...rest}
      render={() => (user ? <Redirect to="/" /> : <Component />)}
    />
  );
};

export default AuthRoute;
