import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// User routes require a user to be logged in to
// view a page. If a user is not logged in they
// will be redirected to the login page

const UserRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => {
    return auth.user;
  });

  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/accounts/login" />)}
    />
  );
};

export default UserRoute;
