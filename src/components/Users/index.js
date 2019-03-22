import React, { Component } from "react";
import axios from "axios";
import { List, Form, Icon, Input, Button, Empty, ConfigProvider } from "antd";
import { SpeechBubble } from 'react-kawaii';

import ExpandedItem from "./Expanded";

const config = () => (
  <Empty image={<SpeechBubble mood="sad" size={100}/>} />
);

class Home extends Component {
  constructor() {
    super();

    this.state = {
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
        axios
          .get(`https://api.github.com/users/${values.user}/repos`, {
            headers: {
              Accept: "application/vnd.github.nightshade-preview+json"
            }
          })
          .then(({ data }) =>
            this.setState({
              myRepos: data
            })
          );
      }
    });
  }

  loading() {
    var isLoading = true;

    if(isLoading) {
      return (<SpeechBubble size={220} mood="happy" color="#83D1FB" />);
    }
  }

  render() {
    const { myRepos } = this.state;
    const { form } = this.props;

    const { getFieldDecorator } = form;

    return (
      <div className="App">
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
            <Button type="primary" htmlType="submit" onClick={this.loading}>
              Search
            </Button>
          </Form.Item>
        </Form>

        <ConfigProvider renderEmpty={config}>
          <List
            bordered
            dataSource={myRepos}
            renderItem={item => (
              <List.Item>
                <ExpandedItem itemData={item} />
              </List.Item>
            )}
          />
        </ConfigProvider>
      </div>
    );
  }
}

export default Form.create()(Home);
