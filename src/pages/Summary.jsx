import React, { useEffect } from "react";
import GeneralPage from "./GeneralPage";
import { Button, Card, Descriptions, message } from "antd";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import "../assets/styles/summary-page.scss";
import { redirect } from "react-router-dom";
import MyLoader from "../components/custom/MyLoader";
import PendingLoan from "./PendingLoan";

const Summary = (props) => {
  const { next, setStep, SignOut } = props;
  const { item: newloan } = useSelector((state) => state.main.newloan);
  const { isLoading, item: savedloan } = useSelector(
    (state) => state.main.savedloan
  );
  const { item: user } = useSelector((state) => state.user.user);
  const onSignOut = () => {
    // SignOut();
    // window.location.reload();
    next();
  };
  useEffect(() => {
    if (!user) {
      setStep(0);
    }
  }, [user]);
  if (isLoading) {
    return <MyLoader />;
  }

  return (
    <GeneralPage>
      <Card className="my-card summary-card" title="สรุปข้อมูลการกู้">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="วงเงินกู้">
            <NumericFormat
              displayType="text"
              thousandSeparator={true}
              decimalScale={0}
              allowNegative={false}
              value={savedloan?.REQ_AMT}
            />
          </Descriptions.Item>
          <Descriptions.Item label="จำนวนงวด">
            {savedloan?.REQ_INSNUM}
          </Descriptions.Item>
          <Descriptions.Item label="เงินเหลือรับ">
            <NumericFormat
              displayType="text"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              value={savedloan?.REQ_REMAIN}
            />
          </Descriptions.Item>
          <Descriptions.Item label="ส่งต่อเดือน">
            <NumericFormat
              displayType="text"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              value={savedloan?.REQ_PRCP + savedloan?.REQ_INTR}
            />
          </Descriptions.Item>
          <Descriptions.Item label="เงินต้น">
            <NumericFormat
              displayType="text"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              value={savedloan?.REQ_PRCP}
            />
          </Descriptions.Item>
          <Descriptions.Item label="ดอกเบี้ย">
            <NumericFormat
              displayType="text"
              thousandSeparator={true}
              decimalScale={2}
              allowNegative={false}
              value={savedloan?.REQ_INTR}
            />
          </Descriptions.Item>
          <Descriptions.Item label="สถานะ">
            <PendingLoan member={savedloan} textMode={true} />
          </Descriptions.Item>
        </Descriptions>
        <div className="text-center my-4">
          <Button type="primary" onClick={() => onSignOut()}>
            เสร็จเรียบร้อย
          </Button>
          {/* 
          <Button type="primary" onClick={() => next()}>
            หน้า admin
          </Button> */}
        </div>
      </Card>
      <Card className="my-card mt-2">
        <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "blue" }}>
          {JSON.stringify(savedloan, null, 2)}
        </pre>

        <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "red" }}>
          {JSON.stringify(newloan, null, 2)}
        </pre>
      </Card>
    </GeneralPage>
  );
};

export default Summary;

// return (
//   <GeneralPage>
// <Card className="my-card summary-card" title="สรุปข้อมูลการกู้">
//   <Descriptions column={1} bordered>
//     <Descriptions.Item label="วงเงินกู้">
//       <NumericFormat
//         displayType="text"
//         thousandSeparator={true}
//         decimalScale={2}
//         allowNegative={false}
//         value={newloan?.AMT.toFixed(2)}
//       />
//     </Descriptions.Item>
//     <Descriptions.Item label="จำนวนงวด">{newloan?.CNT}</Descriptions.Item>
//     <Descriptions.Item label="เงินเหลือรับ">
//       <NumericFormat
//         displayType="text"
//         thousandSeparator={true}
//         decimalScale={2}
//         allowNegative={false}
//         value={newloan?.REMAIN}
//       />
//     </Descriptions.Item>
//     <Descriptions.Item label="ส่งต่อเดือน">
//       <NumericFormat
//         displayType="text"
//         thousandSeparator={true}
//         decimalScale={2}
//         allowNegative={false}
//         value={newloan?.PPM}
//       />
//     </Descriptions.Item>
//     <Descriptions.Item label="เงินต้น">
//       <NumericFormat
//         displayType="text"
//         thousandSeparator={true}
//         decimalScale={2}
//         allowNegative={false}
//         value={newloan?.TON}
//       />
//     </Descriptions.Item>
//     <Descriptions.Item label="ดอกเบี้ย">
//       <NumericFormat
//         displayType="text"
//         thousandSeparator={true}
//         decimalScale={2}
//         allowNegative={false}
//         value={newloan?.DOG}
//       />
//     </Descriptions.Item>
//   </Descriptions>
//   <div className="text-center my-4">
//     สหกรณ์ได้รับคำขอเรียบร้อยแล้ว
//     <br />
//     <Button type="primary" onClick={() => onSignOut()}>
//       เสร็จเรียบร้อย
//     </Button>
//   </div>
// </Card>
//     <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "red" }}>
//       {JSON.stringify(newloan, null, 2)}
//     </pre>
//   </GeneralPage>
// );
// return (
//   <GeneralPage>
//     <Card className="my-card summary-card" title="สรุปข้อมูลการกู้">
//       <div className="col-12 mt-2">
//         <Card className="my-card summary-card" title="สรุปข้อมูลการกู้">
//           <Descriptions column={1} bordered>
//             <Descriptions.Item label="วงเงินกู้">
//               <NumericFormat
//                 displayType="text"
//                 thousandSeparator={true}
//                 decimalScale={2}
//                 allowNegative={false}
//                 value={savedloan?.REQ_AMT.toFixed(2)}
//               />
//             </Descriptions.Item>
//             <Descriptions.Item label="จำนวนงวด">
//               {savedloan?.REQ_INSNUM}
//             </Descriptions.Item>
//             <Descriptions.Item label="เงินเหลือรับ">
//               <NumericFormat
//                 displayType="text"
//                 thousandSeparator={true}
//                 decimalScale={2}
//                 allowNegative={false}
//                 value={savedloan?.REQ_REMAIN}
//               />
//             </Descriptions.Item>
//             <Descriptions.Item label="ส่งต่อเดือน">
//               <NumericFormat
//                 displayType="text"
//                 thousandSeparator={true}
//                 decimalScale={2}
//                 allowNegative={false}
//                 value={savedloan?.REQ_PRCP+savedloan?.REQ_INTR}
//               />
//             </Descriptions.Item>
//             <Descriptions.Item label="เงินต้น">
//               <NumericFormat
//                 displayType="text"
//                 thousandSeparator={true}
//                 decimalScale={2}
//                 allowNegative={false}
//                 value={savedloan?.REQ_PRCP}
//               />
//             </Descriptions.Item>
//             <Descriptions.Item label="ดอกเบี้ย">
//               <NumericFormat
//                 displayType="text"
//                 thousandSeparator={true}
//                 decimalScale={2}
//                 allowNegative={false}
//                 value={savedloan?.REQ_INTR}
//               />
//             </Descriptions.Item>
//           </Descriptions>
//           <div className="text-center my-4">
//             สหกรณ์ได้รับคำขอเรียบร้อยแล้ว
//             <br />
//             <Button type="primary" onClick={() => onSignOut()}>
//               เสร็จเรียบร้อย
//             </Button>
//           </div>
//         </Card>
//         <Card className="my-card mb-2">
//           <pre
//             style={{ height: "auto", whiteSpace: "pre-wrap", color: "red" }}
//           >
//             {JSON.stringify(savedloan, null, 2)}
//           </pre>
//         </Card>
//       </div>
//     </Card>
//   </GeneralPage>
// );
