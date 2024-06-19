// import { Header } from "antd/es/layout/layout";
// import { Menu } from "antd";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import "../../assets/styles/main-header.scss";
// import MyLoader from "../custom/MyLoader";
// import * as actions from "../../app/actions/main";
// import UserInfo from "./UserInfo";

// const MainHeader = () => {
//   const dispatch = useDispatch();
//   const { isLoading, items: menu } = useSelector((state) => state.main.menu);
//   const { item: user } = useSelector((state) => state.user.user);

//   useEffect(() => {
//     console.log("menu=", menu);
//   }, [menu]);

//   if (isLoading) {
//     return <MyLoader color="red" />;
//   }

//   function logout() {
//     dispatch(actions.logoutApi());
//   }

//   // const menuItems = menu?.map((item) => ({
//   //   key: item.id,
//   //   label:
//   //     user !== null && item.link === "/login" ? (
//   //       <a onClick={logout}>Logout</a>
//   //     ) : (
//   //       <Link to={item.link}>{item.text}</Link>
//   //     ),
//   // }));

//   return (
//     <Header>
//       <div className="container-fluid main-header">
//         {user && <UserInfo />}
//         <div className="container">
//           <Menu
//             theme="dark" // You can switch between "dark" and "light" theme here
//             mode="horizontal"
//             className="main-menu"
//             items={menu?.map((item) => ({
//               key: item.id,
//               label:
//                 user !== null && item.link === "/login" ? (
//                   <a onClick={logout}>Logout</a>
//                 ) : (
//                   <Link to={item.link}>{item.text}</Link>
//                 ),
//             }))} // Using the `items` prop to pass menu configuration
//           />
//         </div>
//       </div>
//     </Header>
//   );
// };

// export default MainHeader;
// import { Menu } from 'antd'
import { Header } from "antd/es/layout/layout";
// import MainNav from "./MainNav";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  useEffect(() => {
    console.log("menu=", menu);
  }, [menu]);
  if (isLoading) {
    return <MyLoader color="red" />;
  }
  function logout() {
    // alert('logout');
    dispatch(actions.logoutApi());
    return navigate("/afterlogin");
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
                    <a onClick={() => logout()}>Logout</a>
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
