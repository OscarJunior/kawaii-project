import React, { Component } from "react";
import { Icon } from "antd";

import "./expanded-style.css";

class ExpandedItem extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false
    };
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
            onClick={() =>
              this.setState({
                isExpanded: !isExpanded
              })
            }
          />
        </div>

        <div>
          {isExpanded ? <span>SHOW ME THE COMMENTS FROM THIS REPO</span> : null}
        </div>
      </div>
    );
  }
}

export default ExpandedItem;
