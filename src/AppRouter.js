import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import * as Sentry from '@sentry/browser';

import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import Home from "./components/Home";
import Users from "./components/Users";
import OhNo from "./components/OhNo";

class AppRouter extends Component {
  state = {error : null}

  componentDidCatch(error, errorInfo) {
    const { history } = this.props;
    history.push("/oh-no");

    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <button onClick={() => Sentry.showReportDialog()}>Report feedback</button>
      );
    } else {
      return (
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" exact component={window.localStorage.getItem("userData")? Home : Login} />
          <Route path="/users" component={window.localStorage.getItem("userData")? Users : Login} />
          <Route path="/oh-no" component={window.localStorage.getItem("userData")? OhNo : Login} />
        </div>
      );
    }
  }
}

export default withRouter(AppRouter);
