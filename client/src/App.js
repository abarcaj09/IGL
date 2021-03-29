import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Create,
  EditProfile,
  Explore,
  Home,
  Login,
  Post,
  Profile,
  Register,
} from "./pages";
import AuthRoute from "./components/AuthRoute";
import UserRoute from "./components/UserRoute";
import Header from "./components/Header";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const { user, config } = useSelector(({ auth }) => {
    return auth;
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user.username, config));
    }
  }, [dispatch, user, config]);

  return (
    <div className="app-body">
      <Router>
        <Switch>
          <AuthRoute exact path="/accounts/register" component={Register} />

          <AuthRoute exact path="/accounts/login" component={Login} />

          <UserRoute exact path="/accounts/edit">
            <Header />
            <EditProfile />
          </UserRoute>

          <UserRoute exact path="/explore">
            <Header />
            <Explore />
          </UserRoute>

          <UserRoute exact path="/create">
            <Header />
            <Create />
          </UserRoute>

          {/* User doesn't have to be logged in to view a post if they have the :id*/}
          <Route exact path="/p/:id">
            <Header />
            <Post />
          </Route>

          <UserRoute exact path="/:username">
            <Header />
            <Profile />
          </UserRoute>

          <UserRoute exact path="/:username/saved">
            <Header />
            <Profile />
          </UserRoute>

          <UserRoute exact path="/">
            <Header />
            <Home />
          </UserRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
