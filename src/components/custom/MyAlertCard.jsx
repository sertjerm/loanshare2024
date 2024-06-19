import React from "react";
// import "sweetalert2/dist/sweetalert2.min.css";
import "../../assets/styles/my-alert-card.scss";
import { Button, Card } from "antd";
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

const MyAlertCard = (props) => {
  let { type, title, msg,callback } = props;
  const DisplayIcon = () => {
    type = type || "success";
    switch (type) {
      case "info": {
        return <InfoCircleOutlined />;
      }
      case "warning": {
        return <InfoCircleOutlined />;
      }
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
      <h2>{title || ""}</h2>
      <p>{msg || ""}</p>

      <Button type="primary" size="large" onClick={()=>callback()}>
        OK
      </Button>
      {/* </div> */}
    </Card>
  );
};

export default MyAlertCard;

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
