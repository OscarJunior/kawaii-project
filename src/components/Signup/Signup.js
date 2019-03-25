import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Icon, Input, Button, notification } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signup extends Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(`http://localhost:8080/v1/signup/`, { name: values.name, email: values.email, password : values.password })
          .then(res => {
            window.location.replace('/')
          })
          .catch( err => {
            this.openNotification("Error","Wrong Email or Password")
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
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div>
        <h1>Singup</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
        <Link to="signup">SignUp</Link>
      </div>
    );
  }
}

export default Form.create()(Signup);