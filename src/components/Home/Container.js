import React, { Component } from "react";

import { Switch, Button, notification } from "antd";
import {
  Browser,
  Cat,
  CreditCard,
  File,
  IceCream,
  Planet
} from "react-kawaii";

import "./container-style.css";

import axios from "axios";
import storage from '../../core/utils/storage';
import kawaiiReference from '../../core/utils/kawaiiReference';

const openNotification = (type, msg, description) => {
  notification[type]({
    message: msg,
    description: description,
  });
};

class Container extends Component {
  constructor() {
    super();
    this.state = {
      myKawaiiInLeft: [
        isLeft => (
          <Cat
            size={320}
            mood={isLeft ? "excited" : "sad"}
            color="#596881"
            refString="catLeft"
          />
        ),
        isLeft => (
          <File
            size={200}
            mood={isLeft ? "excited" : "sad"}
            color="#83D1FB"
            refString="fileLeft"
          />
        ),
        isLeft => (
          <IceCream
            size={300}
            mood={isLeft ? "excited" : "sad"}
            color="#FDA7DC"
            refString="iceCreamLeft"
          />
        ),
        isLeft => (
          <Planet
            size={220}
            mood={isLeft ? "excited" : "sad"}
            color="#FCCB7E"
            refString="planetLeft"
          />
        )
      ],
      myKawaiiInRight: [
        isLeft => (
          <Browser
            size={200}
            mood={isLeft ? "sad" : "excited"}
            color="#61DDBC"
            refString="browserRight"
          />
        ),
        isLeft => (
          <CreditCard
            size={200}
            mood={isLeft ? "sad" : "excited"}
            color="#83D1FB"
            refString="creditCardRight"
          />
        )
      ]
    };

    if(storage.getKawaiisInLeft()) {
      this.state = {
        myKawaiiInLeft: eval('([' + storage.getKawaiisInLeft() + '])'),
        myKawaiiInRight: eval('([' + storage.getKawaiisInRight() + '])')
      }
    }

    this.resetHandler = this.resetHandler.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.saveKawaiis = this.saveKawaiis.bind(this);
    this.loadKawaiisFromDB = this.loadKawaiisFromDB.bind(this);

  }

  saveLocalStorage() {
    storage.setKawaiisBothSides(this.state.myKawaiiInLeft, this.state.myKawaiiInRight);
  }

  resetHandler() {
    let shouldGoAtLeft = [];
    let shouldGoAtRight = [];

    for (let kawaii of this.state.myKawaiiInLeft) {
      kawaii(true).props.mood === "sad" ? shouldGoAtRight.push(kawaii) : shouldGoAtLeft.push(kawaii);
    }
    
    for (let kawaii of this.state.myKawaiiInRight) {
      kawaii().props.mood === "sad" ? shouldGoAtLeft.push(kawaii) : shouldGoAtRight.push(kawaii);
    }

    this.setState({
      myKawaiiInLeft: shouldGoAtLeft,
      myKawaiiInRight: shouldGoAtRight
    });
  }

  loadKawaiisFromDB() {
    let leftKawaiis = [];
    let rightKawaiis = [];
    axios.get(`http://localhost:8080/v1/cols/${storage.getUserId()}`, {
      headers: {
        Authorization: `Bearer ${storage.getAccessToken()}`
      }
    })
    .then(res => {
      for (let column of res.data){
        if (column.position === "LEFT") {
          for(let kawaiiRef of column.kawaiisList){
            leftKawaiis.push(kawaiiReference.get(kawaiiRef));
          }
        } else {
          for (let kawaiiRef of column.kawaiisList) {
            rightKawaiis.push(kawaiiReference.get(kawaiiRef));
          }
        }
      }
    })
    .then(() => {
      this.setState({
        myKawaiiInLeft: leftKawaiis,
        myKawaiiInRight: rightKawaiis
      })
    })
  }

  saveKawaiis() {
    if (storage.getUserId() && storage.getAccessToken()) {
      let kawaiisInLeft = [];
      let kawaiisInRight = [];

      for (let kawaii of this.state.myKawaiiInLeft) {
        kawaiisInLeft.push(kawaii(true).props.refString);
      }
      for (let kawaii of this.state.myKawaiiInRight) {
        kawaiisInRight.push(kawaii().props.refString);
      }

      axios.all([
        axios
          .put(`http://localhost:8080/v1/cols/${storage.getUserId()}`, {
            position: "LEFT",
            kawaiisList: kawaiisInLeft,
          }, {
            headers: {
              Authorization: `Bearer ${storage.getAccessToken()}`
            }
          }),
        axios
          .put(`http://localhost:8080/v1/cols/${storage.getUserId()}`, {
            position: "RIGHT",
            kawaiisList: kawaiisInRight,
          }, {
            headers: {
              Authorization: `Bearer ${storage.getAccessToken()}`
            }
          })
      ])
      .then(axios.spread((left, right) => {
        if (left.status === 200 && right.status === 200) {
          openNotification('success', 'Kawaiis Saved', 'Kawaiis successfully stored in database');
        }
      }))
        
    } else {
      openNotification("error", "Login First", "You need to be authenticated to use this feature");
    }
  }

  render() {
    const { myKawaiiInLeft, myKawaiiInRight } = this.state;

    this.saveLocalStorage();

    return (
      <div>
        <Switch onChange={this.resetHandler} />
        <h2>Make kawaiis happy</h2>

        <Button type="primary" onClick={this.saveKawaiis}>Save to DB</Button>
        <Button type="primary" onClick={this.loadKawaiisFromDB}>Load from DB</Button>
        <Button type="danger" onClick={() => {storage.deleteStoredKawaiis()}}>Delete Local Stored Kawaiis</Button>

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
                openNotification('success', 'Kawaii has been moved', 'The kawaii has been moved to the opposite side');
              }
            }}
            onDragOver={e => {
              e.preventDefault();
            }}
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
                openNotification('success', 'Kawaii has been moved', 'The kawaii has been moved to the opposite side');
              }
            }}
            onDragOver={e => {
                e.preventDefault()
              }
            }
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
