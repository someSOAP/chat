import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { postAuth } from "../utils";

const LoginForm : React.FC = () => {
    const [form] = Form.useForm();

    return (
        <>
            <Form
                name="login"
                form={form}
                initialValues={{ remember: true }}
                onFinish={(data)=>{
                    const params = new URLSearchParams();
                    params.append("username", data.username);
                    params.append("password", data.password);
                    postAuth('login', params);
                }}

                method="POST"
                action="login"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/auth/register">register now!</a>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;
