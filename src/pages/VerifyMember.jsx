import React, { useEffect } from "react";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { Avatar, Button, Card, Descriptions, Tag } from "antd";
import GeneralPage from "./GeneralPage";
import { NumericFormat } from "react-number-format";
import "../assets/styles/member-info.scss";
import MemberInfo from "./MemberInfo";
import SweetAlert from "../components/custom/SweetAlert";
import MyAlertCard from "../components/custom/MyAlertCard";
// import MyAlertCard from "../components/custom/MyAlertCard";

const VerifyMember = (props) => {
  const { next, prev, SignOut, setStep } = props;
  const dispatch = useDispatch();
  const { item: user, loginStatus } = useSelector((state) => state.user.user);
  const { isLoading, item: member } = useSelector((state) => state.main.member);

  function onSignOut() {
    SignOut();
    prev();
  }

  useEffect(() => {
    if (loginStatus === "success") {
      dispatch(actions.getMember(user?.MEMB_CODE));
    } else {
      prev();
      //  alert("Login failed"); // แสดง alert เมื่อ login ล้มเหลว
    }
  }, [loginStatus]);
  // useEffect(() => {
  //   dispatch(actions.getMember(user?.MEMB_CODE));
  // }, [user]);

  useEffect(() => {
    if (member) {
      if (member?.IS_ALLOW == 0) {
        setStep(null, true); //set step error=true;
      } else {
        setStep(null, false); //set step error=true;
      }
    }
  }, [member]);
  if (isLoading) {
    return <MyLoader />;
  }
  //   if (member?.IS_ALLOW) {
  //     return <MemberInfo {...props} />;
  //   } else {
  //   return <SweetAlert title="Warning" type="warning" icon="warning" />;
  //   }
  return (
    <GeneralPage>
      <MyAlertCard type="info" title="info" msg="stestest" callback={next} />
      <MyAlertCard
        type="success"
        title="สำเร็จ"
        msg="sted3234stest"
        callback={next}
      />
      <MyAlertCard
        type="warning"
        title="คำเตือน"
        msg="stesdfsdfdsstest"
        callback={next}
      />
      <MyAlertCard
        type="error"
        title="โปรดตรวจสอบ"
        msg="stsdfdsfs323432estest"
        callback={next}
      />
    </GeneralPage>
  );
};

export default VerifyMember;
const USERINFO = [
  { id: 1, name: "SAL_AMT", label: "เงินเดือน", point: 2 },
  { id: 2, name: "TOT_BALN", label: "เงินเหลือรับ", point: 2 },
  { id: 3, name: "MEMB_CURSHAR", label: "หุ้นสะสม", point: 0 },
];
