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

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/accounts/register">
            <Register />
          </Route>
          <Route exact path="/accounts/login">
            <Login />
          </Route>
          <Route exact path="/accounts/edit">
            <EditProfile />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/p/:id">
            <Post />
          </Route>
          <Route exact path="/:username">
            <Profile />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
