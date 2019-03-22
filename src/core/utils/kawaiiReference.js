import React from 'react';

import {
    Browser,
    Cat,
    CreditCard,
    File,
    IceCream,
    Planet
  } from "react-kawaii";

export default {
    get(RefString) {
        switch (RefString) {
          case "catLeft":
            return (isLeft => (
              <Cat
                size={320}
                mood={isLeft ? "excited" : "sad"}
                color="#596881"
                refString="catLeft"
              />
            ));
          case "fileLeft":
            return(isLeft => (
              <File
                size={200}
                mood={isLeft ? "excited" : "sad"}
                color="#83D1FB"
                refString="fileLeft"
              />
            ));
          case "iceCreamLeft":
            return(isLeft => (
              <IceCream
                size={300}
                mood={isLeft ? "excited" : "sad"}
                color="#FDA7DC"
                refString="iceCreamLeft"
              />
            ));
          case "planetLeft":
            return(isLeft => (
              <Planet
                size={220}
                mood={isLeft ? "excited" : "sad"}
                color="#FCCB7E"
                refString="planetLeft"
              />
            ));
          case "browserRight":
            return(isLeft => (
              <Browser
                size={200}
                mood={isLeft ? "sad" : "excited"}
                color="#61DDBC"
                refString="browserRight"
              />
            ));
          case "creditCardRight":
            return(isLeft => (
              <CreditCard
                size={200}
                mood={isLeft ? "sad" : "excited"}
                color="#83D1FB"
                refString="creditCardRight"
              />
            ));
          default: break;
        }
    }
}