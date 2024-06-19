// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MainHeader from "./components/Header/MainHeader";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./app/actions/main";
import RequestForm from "./pages/RequestForm";
import LoanApplicationForm from "./pages/LoanApplicationForm";
import UserInfo from "./components/Header/UserInfo";
import RequestAdmin from "./pages/RequestAdmin";
import AfterLogin from "./pages/AfterLogin";

const { Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { item: user } = useSelector((state) => state.user.user);
  // const { isLoading, items: menu } = useSelector((state) => state.main.menu);
  useEffect(() => {
    dispatch(actions.getMenu());
    // dispatch(actions.getMember("012938"));
  }, [dispatch]);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Router basename="/loan2024">
      <Layout>
        {user && <UserInfo />}

        <MainHeader />
        <Content>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/request" element={<RequestForm />} />
              <Route path="/admin" element={<RequestAdmin />} />
              <Route path="/request2" element={<LoanApplicationForm />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/afterlogin" element={<AfterLogin />} />
              <Route path="/login" element={<Login />} />
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

export default App;
