// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import MainHeader from "./components/Header/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./app/actions/main";
import UserInfo from "./components/Header/UserInfo";
import Home from "./pages/Home";
import Test from "./pages/Test";

const { Content, Footer } = Layout;

const AppAdmin = () => {
    
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Router basename="/admin2024">
      <Layout>
        {/* {user && <UserInfo />}
        <MainHeader /> */}
        <Content>
          <div>
            <Routes>
              <Route path="/" element={<Test2 />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2024 Created by Ant UED
          test create branch
        </Footer>
      </Layout>
    </Router>
  );
};

export default AppAdmin;

const Test2 = () => {
    return (
        <div>test2</div>
    )
}
