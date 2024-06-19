// import { Menu } from "antd";

import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const MainNav = () => {
  // const location = useLocation();

  // return (
  //   <Menu selectedKeys={[location.pathname]} mode="horizontal">
  //     <Menu.Item key="/">
  //       <Link to="/">Home</Link>
  //     </Menu.Item>
  //     <Menu.Item key="/about">
  //       <Link to="/about">About</Link>
  //     </Menu.Item>
  //     <Menu.Item key="/contact">
  //       <Link to="/contact">Contact</Link>
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <Menu theme="dark" mode="horizontal" selectable={false}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/contact">Contact</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MainNav;

// const items = new Array(5).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));
// const MainNav = () => {
//   return (
//     <Menu
//       theme="dark"
//       mode="horizontal"
//       defaultSelectedKeys={["1"]}
//       items={items}
//       style={{
//         flex: 1,
//         minWidth: 0,
//       }}
//     />
//   );
// };

// export default MainNav;
