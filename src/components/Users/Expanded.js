import React, { Component } from "react";
import { Icon } from "antd";
import axios from "axios";

import "./expanded-style.css";

class ExpandedItem extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false,
      commits : []
    };
  }

  componentDidMount = () => {
    const { full_name } = this.props.itemData
    axios
      .get(`https://api.github.com/repos/${full_name}/commits`, {
        headers: {
          Accept: "application/vnd.github.nightshade-preview+json"
        }
      })
      .then(({ data }) =>
        this.setState({
          commits: data
        })
      )
      .catch( err => {
        console.log(err)
      })
  }
  render() {
    const { itemData } = this.props;
    const { isExpanded, commits } = this.state;

    const { name } = itemData; 

    const info = commits.map( ({commit, node_id}) => (<p key={node_id}><span>Name : {commit.author.name}</span><span> Date : {commit.author.date}</span><span> Message : {commit.message}</span></p>))
    return (
      <div className="container-expanded-item">
        <div className="align-center-in-item">
          <span>{name}</span>
          <Icon
            type={`${isExpanded ? "up" : "down"}-circle`}
            onClick={() => {
              this.setState({
                isExpanded: !isExpanded
              })
              this.props.message(`${name}`,`This repository has ${commits.length} commits`)
            }}
          />
        </div>

        <div>
          {isExpanded ? (info.length === 0 ? "No commits yet" : info) : null}
        </div>
      </div>
    );
  }
}

export default ExpandedItem;
