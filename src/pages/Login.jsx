// import React from 'react';
import { Button, Card, Form, Input, Tag } from "antd";
// import "../assets/styles/login-form.scss";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { useEffect, useRef, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import { InfoCircleOutlined } from "@ant-design/icons";
import GeneralPage from "./GeneralPage";
import ScrollableInputNumber from "../components/custom/ScrollableInputNumber";
import MoneyPicker from "../components/custom/MoneyPicker";

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
    <GeneralPage>
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
            username: "006315",
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
      <Card className="my-card">
        {/* <ScrollableInputNumber /> */}
        <MoneyPicker />
      </Card>
    </GeneralPage>
  );
};
export default Login;
