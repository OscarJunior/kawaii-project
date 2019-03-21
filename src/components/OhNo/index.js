import React, { Component } from "react";
import { CreditCard } from "react-kawaii";

class OhNo extends Component {
  render() {
    return (
      <div>
        <h1>Oh no, something looks like wrong!!!</h1>
        <CreditCard size={200} mood="sad" color="#83D1FB" />
      </div>
    );
  }
}

export default OhNo;
