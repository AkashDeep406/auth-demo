import React, { useState, useEffect } from "react";

import "bootswatch/dist/cyborg/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./views/home/home";
import SignUp from "./views/signup";
import SignIn from "./views/signin";
import Dashboard from "./views/dashboard";

export default function App() {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <h4>Auth Demo</h4>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}>
            {getToken ? (
              <Redirect to="/dashboard" />
            ) : (
              <Route path={"/"} component={Home} />
            )}
          </Route>

          <Route path="/signup">
            {getToken ? (
              <Redirect to="/dashboard" />
            ) : (
              <Route path={"/signup"} component={SignUp} />
            )}
          </Route>

          <Route path={"/signin"}>
            {getToken ? (
              <Redirect to="/dashboard" />
            ) : (
              <Route path={"/signin"} component={SignIn} />
            )}
          </Route>

          <PrivateRoute component={Dashboard} path="/dashboard" />
        </Switch>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        getToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const getToken = () => {
  return localStorage.getItem("toke");
};
