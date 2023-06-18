import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { FC, ReactElement } from 'react';
import './index.less';
import useLogin from './useLogin';
// import bgc from './loginbgc.jpeg';


const Login: FC = (props): ReactElement => {
  console.log(props)
  const [ loginForm ] = Form.useForm();
  const { loginSubmit } = useLogin({loginForm});

  return (
    <div className="login">
      <div className="login-contentBox">
        <div className="login-title">密码登陆</div>
        <div>
          <Form
            form={loginForm}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={loginSubmit}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="pwd"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                allowClear
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="https://wwww.baidu.com">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;