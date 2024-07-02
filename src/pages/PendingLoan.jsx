import React from "react";
import { formatDateInThai } from "../app/jsUtils/thaiMoment";
import { Alert } from "antd";

const PendingLoan = (props) => {
  let { member, textMode } = props;
  let req_date = formatDateInThai(member?.REQ_DATE);
  let display_date = ` ${req_date}`;
  if (textMode === true) {
    return <div className="text-success">{display_date}</div>;
  }
  
  return (
    <p>
      <Alert message={display_date} type={"info"} showIcon />
      <div className="mt-2 text-danger">กรุณารออนุมัติ ไม่เกิน 2 ชั่วโมง</div>
    </p>
  );
};

export default PendingLoan;
