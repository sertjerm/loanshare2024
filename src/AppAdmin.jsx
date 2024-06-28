import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { useEffect } from "react";
import { Header } from "antd/es/layout/layout";
import AdminLogin from "./pages/AdminLogin";
import RequestAdmin from "./pages/RequestAdmin";

const { Content, Footer } = Layout;

const AppAdmin = () => {
  return (
    <Router basename="/admin2024">
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Location changed to: ${location.pathname}`);
    // Add any other logic you want to execute on location change here
  }, [location]);

  return (
    <Layout>
      <Header>
        <div className="app-name">กู้หุ้นออนไลน์ สอ.มก.</div>
      </Header>
      <Content>
        <div className="container">
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            {/* <Route path="/admin/dashboard" element={<Test2 />} /> */}
            <Route path="/request-admin" element={<RequestAdmin />} />
            {/* <Route path="/admin/dashboard/" element={<AdminDashboard />} /> */}
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2024 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const Test2 = () => {
  return <div>test2</div>;
};

export default AppAdmin;