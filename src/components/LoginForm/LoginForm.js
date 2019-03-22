import React from 'react';
import axios from 'axios';
import storage from '../../core/utils/storage';

import {
    Form, Icon, Input, Button, notification,
} from 'antd';
  
const openNotification = (type, msg, description) => {
    notification[type]({
        message: msg,
        description: description,
    });
};

class NormalLoginForm extends React.Component {

    

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios
                    .post('http://localhost:8080/v1/login', {
                        email: values.email,
                        password: values.password
                    })
                    .then(res => {
                        storage.setAccessToken(res.data.access_token);
                        storage.setUserId(res.data._id);
                    })
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(error => {
                        openNotification("error", "Unauthorized", error.toString());
                    })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="login-form" style={{display: "flex", justifyContent: "space-around", paddingTop: 100 + "px"}}>
            <div >
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </div>
        </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;