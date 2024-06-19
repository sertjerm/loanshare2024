import React from "react";
import { Button, Card } from "antd";

import "../assets/styles/my-alert-card.scss";
import { useSelector } from "react-redux";
// import {
//   // CheckCircleOutlined,
//   // InfoCircleOutlined,
//   WarningOutlined,
// } from "@ant-design/icons";
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const SitAlertCard = (props) => {
  let { type, title, msg, callback } = props;
  const { next, prev, SignOut, setStep } = props;
  const DisplayIcon = () => {
    switch (type) {
      case "error": {
        return <CloseCircleOutlined />;
      }
      case "sucess":
      default: {
        return <CheckCircleOutlined />;
      }
    }
  };
  return (
    <Card className={`my-card alert-card ${type} my-2`}>
      <div className="icon">{DisplayIcon()}</div>
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

      <Button type="primary" size="large" onClick={() => callback()}>
        OK
      </Button>
      {/* </div> */}
    </Card>
  );
};

export default SitAlertCard;

// <div>
// <InfoCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
// <span>Info</span>
// </div>
// <div>
// <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
// <span>Success</span>
// </div>
// <div>
// <CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
// <span>Error</span>
// </div>
// <div>
// <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />
// <span>Warning</span>
// </div>
