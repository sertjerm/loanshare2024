// import React from 'react';
import { Button, Card, Form, Input, Tag } from "antd";
import "../assets/styles/login-form.scss";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { useEffect, useRef, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import { InfoCircleOutlined } from "@ant-design/icons";

const Login = (props) => {
  let { next, prev, setStep } = props;
  console.log("login page");
  const dispatch = useDispatch();
  const {
    isLoading,
    item: user,
    loginStatus,
  } = useSelector((state) => state.user.user);
  useEffect(() => {
    // If user is not null, call next()
    if (user) {
      next();
    }
  }, [user]); // This effect runs when 'user' changes

  const onFinish = async (values) => {
    console.log("Success:", values);

    // Dispatch the loginApi action and wait for it to complete
    await dispatch(actions.loginApi(values));

    // next() will be called by the useEffect hook when the user is updated in the state
  };
  if (isLoading) {
    return <MyLoader />;
  }
  // function onSetUserId(value) {
  //   setUserId(v);
  // }

  return (
    <div className="container login pt-4">
      <div className="row">
        <div
          className="col-12 col-md-6 "
          data-aos="fade-up"
          data-aos-delay="300"
        >
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
                username: "010999",
                // username: "17365",
                password: "bypass",
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
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
        <Card className="my-card mt-2" >
        <h1>Test Commit Git</h1>
        <p class="text-primary">This text is primary color.</p>
        <p class="text-secondary">This text is secondary color.</p>
        <p class="text-success">This text is success color.</p>
        <p class="text-danger">This text is danger color.</p>
        <p class="text-warning">This text is warning color.</p>
        <p class="text-info">This text is info color.</p>
        <p class="text-light bg-dark">
          This text is light color on a dark background.
        </p>
        <p class="text-dark">This text is dark color.</p>
        <p class="text-body">This text is body color.</p>
        <p class="text-muted">This text is muted color.</p>
        <p class="text-white bg-dark">
          This text is white color on a dark background.
        </p>
        <p class="text-black-50">This text is black with 50% opacity.</p>
        <p class="text-white-50 bg-dark">
          This text is white with 50% opacity on a dark background.
        </p>
        </Card>
        </div>
      </div>
    </div>
  );
};
export default Login;
