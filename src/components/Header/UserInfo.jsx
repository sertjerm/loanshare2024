//import React from "react";
import { Avatar, FloatButton } from "antd";
import { useSelector } from "react-redux";
import "../../assets/styles/user-info.scss";
import { LogoutOutlined } from "@ant-design/icons";

const UserInfo = (props) => {
  const { SignOut } = props;
  const { item: user } = useSelector((state) => state.user.user);
  // console.log("user====", user);

  return (
    <div className="row user-info">
      <div className="container">
        {/* <span>{user?.FULLNAME}</span>
        <Avatar
          src={`https://apps2.coop.ku.ac.th/asset/member_photo/${user?.MEMB_CODE}.png`}
          alt="xxx"
        /> */}
        {/* <LogoutOutlined
          onClick={() => {
            SignOut();
          }}
        /> */}
        {/* <div style={{height:30}}></div> */}
        <FloatButton
          shape="circle"
          type="primary"
          style={{
            top:0,
            right: 40,
          }}
          icon={<LogoutOutlined />}
          onClick={() => {
            SignOut();
          }}
        />
      </div>
    </div>
  );
};

export default UserInfo;
