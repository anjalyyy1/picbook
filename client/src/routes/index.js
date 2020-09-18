import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//components
import Login from "pages/login/container";
import Signup from "pages/signup/container";
import Profile from "pages/profile/container";
import Home from "pages/home/container";

// check for all the private routes except for the public routes(route guarding)
const checkAuthSession = Component => {
  return localStorage.getItem("token") ? Component : <Redirect to="/" />;
};

const routes = props => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route
          path="/profile"
          exact
          render={() => checkAuthSession(<Profile />)}
        />
        <Route path="/home" exact render={() => checkAuthSession(<Home />)} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default routes;
