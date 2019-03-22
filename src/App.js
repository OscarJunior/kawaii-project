import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./App.css";
import AppRouter from "./AppRouter";
import storage from "./core/utils/storage";

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
            {window.localStorage['kawaii-access-token']? (
              <Breadcrumb.Item>
                <Link to="#" onClick={()=>{
                  storage.deleteSession();
                  window.localtion.reload();
                }}>Logout</Link>
              </Breadcrumb.Item>
            ) : (
                <Breadcrumb.Item>
                <Link to="/login">Login</Link>
              </Breadcrumb.Item>
            )}
          </Breadcrumb>

          <AppRouter />
        </div>
      </Router>
    );
  }
}

export default App;
