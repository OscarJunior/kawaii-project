import React, { Component } from "react";
import { Switch } from "antd";
import {
  Browser,
  Cat,
  CreditCard,
  File,
  IceCream,
  Planet
} from "react-kawaii";

import "./container-style.css";

const myKawaiiInLeft = [
  isLeft => (
    <Cat size={320} mood={isLeft ? "excited" : "sad"} color="#596881" />
  ),
  isLeft => (
    <File size={200} mood={isLeft ? "excited" : "sad"} color="#83D1FB" />
  ),
  isLeft => (
    <IceCream
      size={300}
      mood={isLeft ? "excited" : "sad"}
      color="#FDA7DC"
    />
  ),
  isLeft => (
    <Planet
      size={220}
      mood={isLeft ? "excited" : "sad"}
      color="#FCCB7E"
    />
  )];

const myKawaiiInRight = [
  isLeft => (
    <Browser
      size={200}
      mood={isLeft ? "sad" : "excited"}
      color="#61DDBC"
    />
  ),
  isLeft => (
    <CreditCard
      size={200}
      mood={isLeft ? "sad" : "excited"}
      color="#83D1FB"
    />
  )];

class Container extends Component {
  constructor() {
    super();

    this.state = {
      myKawaiiInLeft,
      myKawaiiInRight
    };
  }

  reset = () => {

    this.setState({ myKawaiiInLeft, myKawaiiInRight });

  }
  
  render() {
    const { myKawaiiInLeft, myKawaiiInRight } = this.state;

    return (
      <div>
        <Switch onChange={this.reset} />
        <h2>Make kawaiis happy</h2>

        <div className="container-parent">
          <div
            className="container-son"
            onDrop={e => {
              const positionInRight = e.dataTransfer.getData("positionInRight");

              if (positionInRight) {
                this.setState({
                  myKawaiiInLeft: [
                    ...this.state.myKawaiiInLeft,
                    this.state.myKawaiiInRight[positionInRight]
                  ],
                  myKawaiiInRight: this.state.myKawaiiInRight.filter(
                    (kawaii, i) => i !== Number(positionInRight)
                  )
                });
              }
            }}
            onDragOver={e => e.preventDefault()}
          >
            {myKawaiiInLeft.map((kawaii, i) => (
              <div
                draggable
                onDragStart={e => e.dataTransfer.setData("positionInLeft", i)}
                key={i}
              >
                {kawaii(true)}
              </div>
            ))}
          </div>
          <div
            className="container-son"
            onDrop={e => {
              const positionInLeft = e.dataTransfer.getData("positionInLeft");

              if (positionInLeft) {
                this.setState({
                  myKawaiiInRight: [
                    ...this.state.myKawaiiInRight,
                    this.state.myKawaiiInLeft[positionInLeft]
                  ],
                  myKawaiiInLeft: this.state.myKawaiiInLeft.filter(
                    (kawaii, i) => i !== Number(positionInLeft)
                  )
                });
              }
            }}
            onDragOver={e => e.preventDefault()}
          >
            {myKawaiiInRight.map((kawaii, i) => (
              <div
                draggable
                onDragStart={e => e.dataTransfer.setData("positionInRight", i)}
                key={i}
              >
                {kawaii()}
              </div>
            ))}
          </div>
        </div>
      </div>
    );//End Return
  }
}

export default Container;
