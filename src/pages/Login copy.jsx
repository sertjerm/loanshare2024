// import React from 'react';
import { Button, Card, Form, Input } from "antd";
import "../assets/styles/login-form.scss";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  console.log("login page");
  const dispatch = useDispatch();
  const { isLoading, item: user } = useSelector((state) => state.user.user);
  // const { item: member } = useSelector((state) => state.main?.member);
  const navigate = useNavigate();
  // const member = useSelector((state) => state.main);
  useEffect(() => {
    if (user) {
      // dispatch(actions.getMember(user.MEMB_CODE));
      return navigate("/afterlogin");
    }
  }, [user]);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(actions.loginApi(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="container login pt-4">
      <div className="row">
        <div className="col-12 col-md-6 ">
          <Card title="Login form " className="login-card my-card">
            <Form
              name="login"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              //   style={{
              //     maxWidth: 600,
              //   }}
              initialValues={{
                //   remember: true,
                username: "012938",
                password: "bypass",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Login;
