import React, { Component } from "react";
import { Switch, Button } from "antd";
import {
  Browser,
  Cat,
  CreditCard,
  File,
  IceCream,
  Planet
} from "react-kawaii";

import "./container-style.css";

class Container extends Component {
  constructor() {
    super();

    this.state = {
      myKawaiiInLeft: [
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
        )
      ],
      myKawaiiInRight: [
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
        )
      ]
    };

    if(window.localStorage["myKawaiiLeft"]) {
      this.state = {
        myKawaiiInLeft: eval('([' + window.localStorage["myKawaiiLeft"] + '])'),
        myKawaiiInRight: eval('([' + window.localStorage["myKawaiiRight"] + '])')
      }
    }

    this.reset = this.reset.bind(this);
    this.saveStorage = this.saveStorage.bind(this);

  }

  reset = () => { //Cambia los objetos de columna

    var kawaiiLeft = this.state.myKawaiiInLeft; //Almacena el estado de la columna izquierda
    var kawaiiRigth = this.state.myKawaiiInRight; //Almacena el estado de la columna derecha

    this.setState({
      myKawaiiInLeft: kawaiiRigth,
      myKawaiiInRight: kawaiiLeft
    });

  }

  saveStorage = () => {
    window.localStorage.setItem("myKawaiiLeft", this.state.myKawaiiInLeft);
    window.localStorage.setItem("myKawaiiRight", this.state.myKawaiiInRight);
  }

  cleanStorage = () => {
    window.localStorage.clear();
  }

  render() {
    const { myKawaiiInLeft, myKawaiiInRight } = this.state;

    this.saveStorage();

    return (
      <div>
        <Switch onChange={this.reset} />
        <h2>Make kawaiis happy</h2>

        <Button type="primary" onClick={this.cleanStorage}>Limpiar el Storage</Button>

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
    );
  }
}

export default Container;
