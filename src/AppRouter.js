import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import Home from "./components/Home";
import Users from "./components/Users";
import OhNo from "./components/OhNo";
import LoginForm from "./components/LoginForm/LoginForm";

class AppRouter extends Component {
  componentDidCatch() {
    const { history } = this.props;

    history.push("/oh-no");
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/oh-no" component={OhNo} />
        <Route path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default withRouter(AppRouter);
