import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./App.css";
import AppRouter from "./AppRouter";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/users">Users</Link>
            </Breadcrumb.Item>
          </Breadcrumb>

          <AppRouter />
        </div>
      </Router>
    );
  }
}

export default App;
