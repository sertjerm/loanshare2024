// src/pages/AdminLogin.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../components/custom/MyLoader";
import "../assets/styles/login-admin.scss";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { isLoading, item: user } = useSelector((state) => state.main.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return navigate("/request-admin");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    // Implement login logic here
    navigate('/request-admin'); // Change this to your desired route after login
  };

  // const handleLogin = (values) => {
  //   // Dispatch login action here
  //   dispatch({ type: "LOGIN_REQUEST", payload: values });
  // };

  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <div className="container login pt-4">
      <div className="row">
        <div className="col-12 col-mb-6">
          <Card title="Login Form" className="login-card my-card">
            <Form
              name="login"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                username: "012938",
                password: "bypass",
              }}
              onFinish={handleLogin}
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
                    message: "Please input ypur password!",
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
                {/* <Button type="primary" onClick={handleLogin}>Login</Button> */}
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

export default AdminLogin;

