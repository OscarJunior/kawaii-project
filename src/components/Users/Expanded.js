import React, { Component } from "react";
import axios from 'axios';
import { Icon, notification, List } from "antd";
import { Planet } from 'react-kawaii';

import "./expanded-style.css";

const openNotification = (type, msg, description) => {
  notification[type]({
    message: msg,
    description: description,
  });
};

class ExpandedItem extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false,
      content: (<div><Planet mood="shocked" size={50} color="#72CEFF" className="loading-kawaii"/></div>),
    };

    this.fetchProjectCommits = this.fetchProjectCommits.bind(this);
  }
  
  fetchProjectCommits() {
    const { itemData } = this.props;
    const fullName = itemData.full_name;
    axios
      .get(`http://api.github.com/repos/${fullName}/commits`)
      .then(res => {
        return res.data.map((item, index)=> {
          return (<List.Item key={index}>
                    <strong>Date:</strong> {item.commit.author.date}<br/>
                    <strong>Message:</strong> {item.commit.message}
                  </List.Item>)
        });
      })
      .then(mapedCommits => {
        this.setState({
          content: mapedCommits,
        })
      })
      .catch(error => {
        openNotification('error', 'Error!', 'There was a problem fetching the required data from the github servers')
      })
  }

  render() {
    const { itemData } = this.props;
    const { isExpanded } = this.state;

    const { name } = itemData;

    return (
      <div className="container-expanded-item">
        <div className="align-center-in-item">
          <span>{name}</span>
          <Icon
            type={`${isExpanded ? "up" : "down"}-circle`}
            onClick={() => {
                this.setState({
                  isExpanded: !isExpanded,
                  isLoading: true
                })
                this.fetchProjectCommits();
              }
            }
          />
        </div>

        <div>
          {isExpanded ? <span><List>{this.state.content}</List></span> : null}
        </div>
      </div>
    );
  }
}

export default ExpandedItem;
