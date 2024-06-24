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
// import "./assets/styles/main-wizard.scss";
import "./assets/styles/app.scss";
import Finished from "./pages/Finished";
import GeneralPage from "./pages/GeneralPage";
import MemberInfo from "./pages/MemberInfo";
import Summary from "./pages/Summary";
import VerifyMember from "./pages/VerifyMember";
import SitInfo from "./pages/SitInfo";
import RequestForm2 from "./pages/RequestForm2";
import { Header } from "antd/es/layout/layout";

const { Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { item: user } = useSelector((state) => state.user.user);
  const [current, setCurrent] = useState({ index: 0, isError: false });
  const next = (is_error) => {
    // setCurrent(current + 1);
    setCurrent({ index: current?.index + 1, isError: is_error || false });
  };

  const prev = (is_error) => {
    // setCurrent(current - 1);
    setCurrent({ index: current?.index - 1, isError: is_error || false });
  };
  const setStep = (index, is_error) => {
    // setCurrent(current - 1);
    setCurrent({ index: index || current.index, isError: is_error || false });
  };
  // const setError = (is_error) => {
  //   setCurrent(...current, { isError: is_error });
  // setCurrent((prevState) => ({ ...prevState, isError: is_error }));
  // };
  // const gotoStep = (index,is_error) => {
  //   setCurrent({index:index, isError: is_error });
  // };
  const onChangeStep = (value) => {
    console.log("onChange:", value);
    // if(value<current.index){
    setCurrent({ index: value });
    // }else{
    //   message.error("ต้องผ่านขั้นตอนตรวจสอบข้อมูล")
    // }
  };
  const SignOut = () => {
    dispatch(actions.logoutApi());
    // setTimeout(() => {
    // setCurrent({ index: 0 });
    // }, 500);
  };
  // message.info(current);
  var steps = [
    // {
    //   key: 0,
    //   title: "test",
    //   subTitle: "subTitle1",
    //   content: <RequestAdmin next={next} prev={prev} setStep={setStep} />,
    //   disabled: "0",
    //   description: "description1",
    // },
    {
      key: 1,
      title: "login",
      subTitle: "subTitle1",
      content: <Login next={next} prev={prev} setStep={setStep} />,
      disabled: "0",
      description: "description1",
    },
    {
      key: 1,
      title: "login",
      subTitle: "subTitle1",
      content: <RequestAdmin next={next} prev={prev} setStep={setStep} />,
      disabled: "0",
      description: "description1",
    },
    {
      key: 2,
      title: "ตรวจสอบสิทธิ์",
      subTitle: "subTitle2",
      content: (
        <SitInfo next={next} prev={prev} SignOut={SignOut} setStep={setStep} />
      ),
      disabled: "0",
      description: "description2",
    },
    {
      key: 3,
      title: "คำนวณเงินกู้ใหม่",
      subTitle: "subTitle3",
      content: <RequestForm next={next} prev={prev} setStep={setStep} />,
      disabled: "0",
      description: "description3",
    },
    {
      key: 4,
      title: "สรุปข้อมูล",
      subTitle: "subTitle1",
      content: (
        <Summary next={next} prev={prev} setStep={setStep} SignOut={SignOut} />
      ),
      disabled: "0",
      description: "description1",
    },
    {
      key: 5,
      title: "Admin",
      subTitle: "subTitle4",
      content: (
        <RequestAdmin
          next={next}
          prev={prev}
          setStep={setStep}
          SignOut={SignOut}
        />
      ),
      disabled: "1",
      description: "description4",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  useEffect(() => {
    AOS.init();
  }, []);
  // message.info(current.index);
  // if (!user) {
  //   return <Login next={next} prev={prev} setStep={setStep} />;
  // }
  return (
    <Router basename="/loan2024">
      <Layout>
        <Header>
          <div className="app-name">กู้หุ้นออนไลน์ สอ.มก.</div>
        </Header>
        <Content>
          <div className="steps-container">
            <div className="container">
              <Steps
                current={current.index}
                items={items}
                status={current.isError ? "error" : ""}
                onChange={onChangeStep}
                // percent={80}
                // type={window.innerWidth > 500 ? "navigation" : "inline"}
                // type="inline"
                // type="navigation"
                // size="small"
              />
            </div>
            <div className="steps-content">{steps[current.index]?.content}</div>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          ฝ่ายเทคโนโลยีสารสนเทศ สอ.มก. @2024
          <br />
          02-589-8864-5
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
