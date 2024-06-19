import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React from "react";
import "../assets/styles/my-alert-card.scss";
import { useSelector } from "react-redux";

const DeniedCard = (props) => {
  const { next, prev, SignOut, setStep, member } = props;
  // const { isLoading, item: member } = useSelector((state) => state.main.member);
  let title = "ไม่มีสิทธิ์กู้";
  // let msg = ``
  return (
    <Card className={`my-card alert-card error my-2`}>
      <div className="icon">
        <CloseCircleOutlined />
      </div>
      <h2>{title}</h2>
      <p>
  
        <ul className="ul-reson">
          <li
            className={member?.IS_NOLOAN == 0 ? "text-danger" : "text-success"}
          >
            ไม่มีหนี้{" "}
          </li>
          <li
            className={member?.IS_SHARGRD == 0 ? "text-danger" : "text-success"}
          >
            มีหนี้หุ้นค้ำสัญญาเดียว{" "}
          </li>
          <li className={member?.IS_CHOR == 0 ? "text-danger" : "text-success"}>
            มีหนี้ฉุกเฉินเท่านั้น{" "}
          </li>
        </ul>
      </p>

      <Button type="primary" size="large" onClick={() => SignOut()}>
        OK
      </Button>
    </Card>
  );
};

export default DeniedCard;
