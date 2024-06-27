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
import AdminLogin from "./pages/AdminLogin";
import { Header } from "antd/es/layout/layout";
import RequestAdmin from "./pages/RequestAdmin";

const { Content, Footer } = Layout;

const AppAdmin = () => {
    
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Router basename="/admin2024">
      <Layout>
      <Header>
          <div className="app-name">กู้หุ้นออนไลน์ สอ.มก.</div>
        </Header>
        <Content>
          <div className="container">
            <Routes>
              <Route path="/" element={<AdminLogin />} />
              {/* <Route path="/admin/dashboard" element={<Test2 />} /> */}
              <Route path="/admin/dashboard" element={<RequestAdmin />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2024 Created by Ant UED
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
