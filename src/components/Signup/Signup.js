import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
  render() {
    return (
      <div>
        <h1>signUp</h1>
        <Link to="/">Login</Link>
      </div>
    );
  }
}

export default Signup;