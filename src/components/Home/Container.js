import React, { Component } from "react";
import axios from "axios";
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

class Container extends Component {
  constructor() {
    super();

    this.state = {
      myKawaiiInLeft: [
        isLeft => (
          <Cat id="1" size={320} mood={isLeft ? "excited" : "sad"} color="#596881" />
        ),
        isLeft => (
          <File id="2" size={200} mood={isLeft ? "excited" : "sad"} color="#83D1FB" />
        ),
        isLeft => (
          <IceCream
            id="3"
            size={300}
            mood={isLeft ? "excited" : "sad"}
            color="#FDA7DC"
          />
        ),
        isLeft => (
          <Planet
            id="4"
            size={220}
            mood={isLeft ? "excited" : "sad"}
            color="#FCCB7E"
          />
        )
      ],
      myKawaiiInRight: [
        isLeft => (
          <Browser
            id="5"
            size={200}
            mood={isLeft ? "sad" : "excited"}
            color="#61DDBC"
          />
        ),
        isLeft => (
          <CreditCard
            id="6"
            size={200}
            mood={isLeft ? "sad" : "excited"}
            color="#83D1FB"
          />
        )
      ]
    }

    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange = (e) =>{
    let happyOnLeft = [] , happyOnRight = []

    for (const kawaii of this.state.myKawaiiInLeft) {
      kawaii(true).props.mood === 'excited' ? happyOnLeft.push(kawaii) : happyOnRight.push(kawaii)
    }
    for (const kawaii of this.state.myKawaiiInRight) {
      kawaii().props.mood === 'excited' ? happyOnRight.push(kawaii) : happyOnLeft.push(kawaii)
    }

    happyOnLeft.sort((a,b) => (a().props.id - b().props.id) )
    happyOnRight.sort((a,b) => (a().props.id - b().props.id) )

    this.setState({
      myKawaiiInLeft : happyOnLeft,
      myKawaiiInRight : happyOnRight
    })
  }

  componentDidMount = () =>{
    let {userId, token} = JSON.parse(window.localStorage.getItem('userData'))
    axios.get(`http://localhost:8080/v1/kawaii/${userId}`, { headers: {Authorization: token} })
        .then( ({data}) => {
          let {kawaiisInleft, kawaiisInRight} = data
          
          let wasOnLeft = [] , wasOnRight = []
          
          kawaiisInleft.forEach(value => { //Buscamos por id en los dos lados. Si se encuentra en uno no se busca en el otro
            let kawaii = this.state.myKawaiiInLeft.find(kawaii => (kawaii().props.id === value))
            kawaii ? wasOnLeft.push(kawaii) : wasOnLeft.push(this.state.myKawaiiInRight.find(kawaii => (kawaii().props.id === value)))
          });

          kawaiisInRight.forEach(value => { //Buscamos por id en los dos lados. Si se encuentra en uno no se busca en el otro
            let kawaii = this.state.myKawaiiInLeft.find(kawaii => (kawaii().props.id === value))
            kawaii ? wasOnRight.push(kawaii) : wasOnRight.push(this.state.myKawaiiInRight.find(kawaii => (kawaii().props.id === value)))
          });

          this.setState({
            myKawaiiInLeft : wasOnLeft,
            myKawaiiInRight : wasOnRight
          })
        })
        .catch( err => {
          console.log(err)
        })
  }

  componentWillUnmount = () =>{
    let leftIds = [], rightIds = []

    for (const kawaii of this.state.myKawaiiInLeft) {
      leftIds.push(kawaii().props.id)
    }
    for (const kawaii of this.state.myKawaiiInRight) {
      rightIds.push(kawaii().props.id)
    }

    let data = {kawaiisInleft : leftIds, kawaiisInRight : rightIds}

    let {userId, token} = JSON.parse(window.localStorage.getItem('userData'))
    axios.put(`http://localhost:8080/v1/kawaii/${userId}`, data, { headers: { 'Accept' : "application/json", 'Content-type' : "application/json", 'Authorization' : token} })
      .then(res => {
        window.sessionStorage.setItem('myIds',JSON.stringify(data))
      })
      .catch(err =>{
        console.log(err)
      })
  }

  render() {
    const { myKawaiiInLeft, myKawaiiInRight } = this.state;

    return (
      <div>
        <Switch onChange={this.handlerChange} />
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
    );
  }
}

export default Container;
