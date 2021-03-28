import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

const App = () => {
  return (
    <div className="app-body">
      <Router>
        <Switch>
          <AuthRoute exact path="/accounts/register" component={Register} />

          <AuthRoute exact path="/accounts/login" component={Login} />

          <UserRoute exact path="/accounts/edit">
            <EditProfile />
          </UserRoute>

          <UserRoute exact path="/explore">
            <Explore />
          </UserRoute>

          <UserRoute exact path="/create">
            <Create />
          </UserRoute>

          {/* User doesn't have to be logged in to view a post if they have the :id*/}
          <Route exact path="/p/:id">
            <Post />
          </Route>

          <UserRoute exact path="/:username">
            <Profile />
          </UserRoute>

          <UserRoute exact path="/">
            <Home />
          </UserRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
