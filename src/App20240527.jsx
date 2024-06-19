// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Layout, Steps, message } from "antd";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MainHeader from "./components/Header/MainHeader";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "./app/actions/main";
import RequestForm from "./pages/RequestForm";
import LoanApplicationForm from "./pages/LoanApplicationForm";
import UserInfo from "./components/Header/UserInfo";
import RequestAdmin from "./pages/RequestAdmin";
import AfterLogin from "./pages/AfterLogin";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/styles/main-wizard.scss";
import Finished from "./pages/Finished";

const { Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { item: user } = useSelector((state) => state.user.user);
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const SignOut = () => {
    dispatch(actions.logoutApi());
    setTimeout(() => {
      setCurrent(0);
    }, 500);
  };
  // message.info(current);
  var steps = [
    {
      key: 1,
      title: "login",
      subTitle: "subTitle1",
      content: <Login next={next} prev={prev} />,
      disabled: "0",
      description: "description1",
    },
    {
      key: 2,
      title: "ตรวจสอบสิทธิ์",
      subTitle: "subTitle2",
      content: <AfterLogin next={next} prev={prev} SignOut={SignOut} />,
      disabled: "0",
      description: "description2",
    },
    {
      key: 3,
      title: "คำนวณเงินกู้ใหม่",
      subTitle: "subTitle3",
      content: <RequestForm next={next} prev={prev} />,
      disabled: "0",
      description: "description3",
    },
    {
      key: 4,
      title: "Finished",
      subTitle: "subTitle4",
      content: <Finished next={next} prev={prev} setCurrent={setCurrent} />,
      disabled: "1",
      description: "description4",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Router basename="/loan2024">
      <Layout>
        {user && <UserInfo SignOut={SignOut} />}

        <Content>
          <div className="main-wiz container-fluid">
            <Steps
              current={current}
              items={items}
               status={current === 1 ? "error" : ""}
            />
            <div className="steps-content">{steps[current]?.content}</div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2024 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
  // return <Wizard />;
};

export default App;
