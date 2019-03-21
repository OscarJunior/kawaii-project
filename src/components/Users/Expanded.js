import React, { Component } from "react";
import axios from 'axios';
import { Icon, Empty, List } from "antd";

import "./expanded-style.css";

class ExpandedItem extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false,
      content: (<Empty/>)
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
          content: mapedCommits
        })
      })
  }

  render() {
    const { itemData } = this.props;
    const { isExpanded } = this.state;

    const { name } = itemData;

    this.fetchProjectCommits();

    return (
      <div className="container-expanded-item">
        <div className="align-center-in-item">
          <span>{name}</span>
          <Icon
            type={`${isExpanded ? "up" : "down"}-circle`}
            onClick={() =>
              this.setState({
                isExpanded: !isExpanded
              })
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
