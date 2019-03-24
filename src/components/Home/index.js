import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import Container from "./Container";

class Home extends Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/users">Users</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1>This is my kawaii project</h1>

        <Container />
      </div>
    );
  }
}

export default Home;
