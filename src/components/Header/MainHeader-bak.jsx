// import { Menu } from 'antd'
import { Header } from "antd/es/layout/layout";
// import MainNav from "./MainNav";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import React from 'react'
import "../../assets/styles/main-header.scss";
import MyLoader from "../custom/MyLoader";
import * as actions from "../../app/actions/main";
import UserInfo from "./UserInfo";
const MainHeader = () => {
  const dispatch = useDispatch();
  const { isLoading, items: menu } = useSelector((state) => state.main.menu);
  const { item: user } = useSelector((state) => state.user.user);
  useEffect(() => {
    console.log("menu=", menu);
  }, [menu]);
  if (isLoading) {
    return <MyLoader color="red" />;
  }
  function logout() {
    dispatch(actions.logoutApi());
  }
  return (
    <Header>
      <div className="container-fluid main-header">
        {/* {user && <UserInfo />} */}
        <div className="container">
          <Menu
            theme="dark"
            // theme="light"
            mode="horizontal"
            className="main-menu"
          >
            {menu &&
              menu.map((item) => (
                <Menu.Item key={item.id}>
                  {user !== null && item.link === "/login" ? (
                    <a onClick={logout}>Logout</a>
                  ) : (
                    <Link to={item.link}>{item.text}</Link>
                  )}
                </Menu.Item>
              ))}
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
{
  /* <Menu theme="dark" mode="horizontal">
{menu && menu.map(item => (
  <Menu.Item key={item.id}>
    <Link to={item.link}>{item.text}</Link>
  </Menu.Item>
))}
</Menu> */
}

// <Menu
// theme="dark"
// mode="horizontal"
// items={()=>{
// isArray(menu) && menu.map((item) => ({
//     key: item.id,
//     label: <Link to={item.link}>{item.text}</Link>
//   }));
// }}
// />

// items={[
//   { key: "1", label: <Link to="/">Home</Link> },
//   { key: "2", label: <Link to="/about">About</Link> },
//   { key: "3", label: <Link to="/contact">Contact</Link> },
//   { key: "4", label: <Link to="/login">Login</Link> },
// ]}
