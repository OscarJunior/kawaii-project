import React, { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { List, Form, Icon, Input, Button, Spin, notification } from "antd";
import {Ghost} from "react-kawaii";

import ExpandedItem from "./Expanded";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      isLoading : false,
      myRepos: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form } = this.props;
    const { validateFields } = form;

    validateFields((err, values) => {
      if (!err) {
        this.setState({isLoading: true})
        axios
          .get(`https://api.github.com/users/${values.user}/repos`, {
            headers: {
              Accept: "application/vnd.github.nightshade-preview+json"
            }
          })
          .then(({ data }) => {
            this.setState({
              myRepos: data,
              isLoading: false
            })
            this.openNotification("Download Complete","Los reporsitorios han sido cargados")
          })
          .catch(err =>{
            console.log(err)
            this.setState({
              isLoading: false
            })
            this.openNotification("Error has ocurred","User not found")
          })
      }
    });
  }

  openNotification = (tittle, description) => {
    notification.open({
      message: `${tittle}`,
      description: `${description}`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  render() {
    const { myRepos, isLoading } = this.state;
    const { form } = this.props;

    const { getFieldDecorator } = form;
    return (
      <div className="App">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/users">Users</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1>Calling to GitHub API</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("user", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>

        {
          isLoading ? 
          <div><Spin /> <Ghost size={240} mood="blissful" color="#E0E4E8" /></div>
          :
          <List
            bordered
            dataSource={myRepos}
            renderItem={item => (
              <List.Item>
                <ExpandedItem itemData={item} message={this.openNotification}/>
              </List.Item>
            )}
          />
        }
      </div>
    );
  }
}

export default Form.create()(Home);