import React, { useEffect } from "react";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { Avatar, Button, Card, Descriptions, Tag } from "antd";
import GeneralPage from "./GeneralPage";
import { NumericFormat } from "react-number-format";
import "../assets/styles/member-info.scss";
import Meta from "antd/es/card/Meta";
const MemberInfo = (props) => {
  const { next, prev, SignOut, setStep } = props;
  const dispatch = useDispatch();
  const { item: user,loginStatus } = useSelector((state) => state.user.user);
  const { isLoading, item: member } = useSelector((state) => state.main.member);

  function onSignOut(){
    SignOut();
    prev();
  }

  useEffect(() => {
    if (loginStatus === 'success') {
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
      }else{
        setStep(null, false); //set step error=true;
      }
    }
  }, [member]);
  if (isLoading) {
    return <MyLoader />;
  }
  if(member.IS_ALLOW)
  return (
    <GeneralPage>
      {/* {member && ( */}
      <Card className="my-card member-info">
        <Meta
          className="mb-4"
          avatar={
            <Avatar
              src={
                "https://apps2.coop.ku.ac.th/asset/member_photo/" +
                member?.MEMB_CODE +
                ".png"
              }
              size={100}
            />
          }
          title={`[${member?.MEMB_CODE}] ${member?.FULLNAME}`}
          description={member?.DEPT_NAME}
        />
        <Descriptions bordered column={1} size="small" className="member-info">
          <Descriptions.Item label="เงินเดือน">
            <NumericFormat
              value={parseFloat(member?.MEMB_SALARY).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </Descriptions.Item>
          <Descriptions.Item label="เงินเหลือรับ">
            <NumericFormat
              value={parseFloat(member?.TOT_BALN).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </Descriptions.Item>
          <Descriptions.Item label="หุ้นปัจจุบัน">
            <NumericFormat
              value={parseFloat(member?.MEMB_CURSHR).toFixed(0)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </Descriptions.Item>
          <Descriptions.Item label="สิทธิ์กู้หุ้นอัตโนมัติ">
            <ul
              className={`alert alert-${
                member?.IS_ALLOW == 0 ? "danger" : "success"
              }`}
            >
              <li
                className={
                  member?.IS_NOLOAN == 0 ? "text-danger" : "text-success"
                }
              >
                ไม่มีหนี้{" "}
              </li>
              <li
                className={
                  member?.IS_SHARGRD == 0 ? "text-danger" : "text-success"
                }
              >
                มีหนี้หุ้นค้ำสัญญาเดียว{" "}
              </li>
              <li
                className={
                  member?.IS_CHOR == 0 ? "text-danger" : "text-success"
                }
              >
                มีหนี้ฉุกเฉินเท่านั้น{" "}
              </li>
            </ul>
            {member?.IS_ALLOW == 1 ? (
              <>
                <Tag onClick={() => next()} color="green">
                  กู้ได้
                </Tag>
                <Button onClick={() => next()}>คำนวณเงินกูู้</Button>
              </>
            ) : (
              <>
                <Tag onClick={() => prev()} color="red">
                  ไม่มีสิทธิ์กู้
                </Tag>{" "}
                <Button onClick={() => SignOut()}>ย้อนกลับ</Button>
              </>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {/* )} */}
    </GeneralPage>
  );
};

export default MemberInfo;
const USERINFO = [
  { id: 1, name: "SAL_AMT", label: "เงินเดือน", point: 2 },
  { id: 2, name: "TOT_BALN", label: "เงินเหลือรับ", point: 2 },
  { id: 3, name: "MEMB_CURSHAR", label: "หุ้นสะสม", point: 0 },
];
