import React, { useEffect } from "react";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { Alert, Avatar, Button, Card, Descriptions, Tag } from "antd";
import GeneralPage from "./GeneralPage";
import { NumericFormat } from "react-number-format";
// import "../assets/styles/member-info.scss";
import "../assets/styles/sit-info.scss";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/th";
import { formatDateInThai } from "../app/jsUtils/thaiMoment";
import PendingLoan from "./PendingLoan";
import Meta from "antd/es/card/Meta";

// ตั้งค่า moment ให้ใช้ภาษาไทย
moment.locale("th");

const SitInfo = (props) => {
  // const {member} =props;
  const { next, prev, SignOut, setStep } = props;
  const dispatch = useDispatch();
  const { item: user, loginStatus } = useSelector((state) => state.user.user);
  const { isLoading, item: member } = useSelector((state) => state.main.member);

  function onSignOut() {
    SignOut();
    prev();
  }
  function onDelete(req_id) {
    console.log("onDelete req_id=", req_id);
    dispatch(actions.DeleteRequest(req_id));
    // setTimeout(() => {
    //   onSignOut();
    // }, 2000);
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
        //|| member?.IS_PENDING!=null) {
        if (member?.IS_PENDING == 1) {
          setStep(null, false); //set step error=true;
        } else {
          setStep(null, true); //set step error=true;
        }
        // setStep(null, true); //set step error=true;
      } else {
        setStep(null, false); //set step error=true;
      }
    }
  }, [member]);
  if (isLoading) {
    return <MyLoader />;
  }
  // let type = ["error", "success","info"];
  // let title = ["ไม่มีสิทธิกู้", "มีสิทธิ์กู้","มีเงินกู้รอพิจารณา"];
  // let icon = [<CloseCircleOutlined />, <CheckCircleOutlined />];

  let noloan = ["error", "success"];
  let chor = ["error", "success"];
  let shargrd = ["error", "success"];

  let type = "error";
  let title = "ไม่มีสิทธิกู้";
  let icon = <CloseCircleOutlined />;



  let is_noloan= member?.IS_NOLOAN=== member?.IS_ALLOW;
  let is_chor = member?.IS_CHOR=== member?.IS_ALLOW;
  let is_shargrd =member?.IS_SHARGRD=== member?.IS_ALLOW;

  if (member?.IS_ALLOW) {
    type = "success";
    title = "มีสิทธิ์กู้";
    icon = <CheckCircleOutlined />;

  } else if (member?.REQ_DATE) {
    // type = "warning";
    type = "info";
    title = "มีเงินกู้รอพิจารณา";
    icon = <InfoCircleOutlined />;
  }
  // else{

  // }

  return (
    <GeneralPage>
      <Card className={`my-card alert-card ${type} my-2`}>
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
        {/* <div className="icon">{icon}</div> */}
        <h2 className={`text-${type}`}>{title}</h2>
        {member?.REQ_DATE == null ? (
          <p>
           {is_noloan&& <Alert
              message="ไม่มีหนี้"
              type={noloan[member?.IS_NOLOAN]}
              showIcon
            />}
            {is_shargrd&&<Alert
              message="มีหนี้หุ้นค้ำสัญญาเดียว"
              type={shargrd[member?.IS_SHARGRD]}
              showIcon
            />}
            {is_chor&&<Alert
              message="มีหนี้ฉุกเฉินเท่านั้น"
              type={chor[member?.IS_CHOR]}
              showIcon
            />}
          </p>
        ) : (
          <PendingLoan member={member} />
        )}
        {member?.IS_ALLOW === 1 ? (
          <>
            {/* <Button type="default" size="large" onClick={() => SignOut()}>
              back
            </Button> */}
            <Button type="primary" size="large" onClick={() => next()}>
              ยื่นกู้
            </Button>
          </>
        ) : (
          <Button type="default" size="large" onClick={() => onDelete(member?.REQ_ID)}>ยกเลิกคำขอ(debug)</Button>
          // <Button type="default" size="large" onClick={() => SignOut()}>
          //   ออกจากระบบ
          // </Button>
        )}
      </Card>
    </GeneralPage>
  );
};
export default SitInfo;
