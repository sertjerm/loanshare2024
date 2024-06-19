// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Card, Form, Input, InputNumber, Radio, message } from "antd";
// import Swal from "sweetalert2";
// import { NumericFormat, PatternFormat } from "react-number-format";
// import * as actions from "../app/actions/main";
// import MyLoader from "../components/custom/MyLoader";
// import "../assets/styles/request-form.scss";
// import * as util from "../components/custom/jsUtils.js";
// import GeneralPage from "./GeneralPage.jsx";

// // Formatter function to handle thousand separators correctly
// const numberFormatter = (value) => {
//   if (!value) return "";
//   const parts = value.toString().split(".");
//   const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   const decimalPart = parts[1] ? `.${parts[1]}` : "";
//   return `${integerPart}${decimalPart}`;
// };

// // Parser function to remove formatting
// const numberParser = (value) => value.replace(/\$\s?|(,*)/g, "");

// const RequestForm = (props) => {
//   const { next, prev, setStep } = props;
//   const dispatch = useDispatch();
//   const { item: user } = useSelector((state) => state.user.user);
//   const { isLoading, item: newloan } = useSelector(
//     (state) => state.main.newloan
//   );

//   const [form] = Form.useForm();

//   const performCalculations = (loan, id, value) => {
//     let {
//       AMT,
//       MAX_AMT,
//       CNT,
//       DAYS,
//       DAYS_IN_YEAR,
//       DOG,
//       INT_RATE,
//       PAYMENT_TYPE,
//       PPM,
//       MAX_PPM,
//       MIN_REMAIN,
//       REMAIN,
//       TON,
//       TOT_BALN,
//     } = loan;
//     let last_ton = 0;
//     let last_dog = 0;
//     let int_rate_m = INT_RATE / 100 / 12;

//     console.log(`performCalculations :${id}`);
//     console.log("Performing calculations with updatedLoan:", loan);

//     switch (id) {
//       case "AMT": {
//         AMT = parseFloat(value);
//         break;
//       }
//       case "CNT": {
//         CNT = parseInt(value);
//         break;
//       }
//       case "PAYMENT_TYPE": {
//         // CNT = parseInt(value);
//         break;
//       }
//       default: {
//         console.log("default");
//       }
//     }

//     if (PAYMENT_TYPE == 1) {
//       fn01();
//     } else {
//       fn02();
//     }

//     function fn01() {
//       // message.info("flat");
//       PPM = (AMT * int_rate_m) / (1 - Math.pow(1 / (1 + int_rate_m), CNT));
//       DOG = (AMT * DAYS * INT_RATE) / 100 / DAYS_IN_YEAR;
//       TON = PPM - DOG;
//     }

//     function fn02() {
//       // message.info("ต้นคงที่");
//       TON = AMT / CNT;
//       var ton_sum = Math.floor(AMT / TON) * TON;
//       last_ton = AMT - ton_sum;
//       DOG = (AMT * DAYS * INT_RATE) / 100 / DAYS_IN_YEAR;
//       last_dog = (last_ton * DAYS * INT_RATE) / 100 / DAYS_IN_YEAR;
//       PPM = TON + DOG;
//     }

//     REMAIN = TOT_BALN - PPM; //.toFixed(2));
//     // // if(REMAIN>MIN_REMAIN){
//     // // if (MAX_PPM > PPM) {
//     // // setStep(null, false);
//     dispatch(
//       actions.updateNewLoan({
//         ...loan,
//         AMT,
//         PPM,
//         REMAIN,
//         TON,
//         TOT_BALN,

//         CNT,
//       })
//     );
//     // Update the form with new values
//     form.setFieldsValue({ ...loan, AMT, PPM, REMAIN, TON, TOT_BALN });

//     if (MAX_PPM < PPM) {
//       // } else {
//       // setStep(null, true);
//       // alert("Error");
//       // message.error(`เงินเหลือรับ ${REMAIN} กรุณาตรวจสอบ วงเงินกู้ หรือจำนวนงวด`)
//       Swal.fire({
//         title: "กรุณาตรวจสอบ!",
//         text: `เงินเหลือรับ ${REMAIN} กรุณาตรวจสอบ วงเงินกู้ หรือจำนวนงวด`,
//         icon: "error",
//       });
//     } else {
//       // dispatch(
//       //   actions.updateNewLoan({
//       //     ...loan,
//       //     AMT,
//       //     PPM,
//       //     REMAIN,
//       //     TON,
//       //     TOT_BALN,
//       //     CNT,
//       //   })
//       // );
//       // // Update the form with new values
//       // form.setFieldsValue({ ...loan, AMT, PPM, REMAIN, TON, TOT_BALN });
//     }
//     console.log(
//       `PAYMENT_TYPE=${PAYMENT_TYPE},TON=${TON},DOG=${DOG},PPM=${PPM},REMAIN=${REMAIN}`
//     );
//     console.log("after-2", loan);
//   };

//   useEffect(() => {
//     if (user) {
//       dispatch(actions.getNewLoan(user.MEMB_CODE));
//     }
//   }, [user, dispatch]);

//   const onFinish = (values) => {
//     console.log("Success:", values);
//     form
//       .validateFields()
//       .then(() => {
//         dispatch(actions.SaveLoanRequest(newloan));
//         Swal.fire({
//           title: "บันทึกข้อมูลเรียบร้อย",
//           text: "บันทึกข้อมูลเรียบร้อย",
//           icon: "success",
//         }).then(() => {
//           next(null, false);
//         });
//       })
//       .catch(() => {
//         setStep(null, true);
//         Swal.fire({
//           title: "กรุณาตรวจสอบ!",
//           text: `เงินเหลือรับ ${newloan.REMAIN} กรุณาตรวจสอบ วงเงินกู้ หรือจำนวนงวด`,
//           icon: "error",
//         });
//       });
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const handleKeyDown = (e, id) => {
//     if (e.key === "Enter") {
//       let value = util.parserNumber(e.target.value);
//       // if(id=="CNT"){
//       //   value = parseInt(value);
//       // }else{
//       //   value = parseFloat(value);
//       // }
//       let temp = { ...newloan, [id]: value };
//       performCalculations(temp, id, value);
//     }
//   };

//   const onPayMentChange = (e) => {
//     let value = e.target.value;
//     let updatedLoan = { ...newloan, PAYMENT_TYPE: value };
//     performCalculations(updatedLoan, "PAYMENT_TYPE", value);
//   };
//   const ResetForm = () => {
//     message.info("reset");
//     let { REMAIN, AMT, CNT, MAX_CNT, TOT_BALN, MAX_AMT, MAX_PPM, MIN_REMAIN } =
//       newloan;

//     const updatedLoan = {
//       ...newloan,
//       AMT: MAX_AMT,
//       PPM: MAX_PPM,
//       REMAIN: MAX_PPM - MIN_REMAIN,
//       CNT: MAX_CNT,
//     };

//     dispatch(actions.updateNewLoan(updatedLoan));
//     // Update the form with new values
//     form.setFieldsValue({
//       AMT: MAX_AMT,
//       PPM: MAX_PPM,
//       REMAIN: MAX_PPM - MIN_REMAIN,
//       CNT: MAX_CNT,
//     });
//   };
//   if (isLoading) {
//     return <MyLoader />;
//   }
//   const formattedMinRemain = newloan?.MIN_REMAIN.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   return (
//     <GeneralPage>
//       <Card className="my-card request-card">
//         <Form
//           onKeyDown={(event) => {
//             if (event.keyCode === 13) {
//               event.preventDefault();
//             }
//           }}
//           form={form}
//           name="request"
//           layout="vertical"
//           initialValues={{ ...newloan }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <div className="div-form-group group-1">
//             <Form.Item
//               label="ยอดเงินกู้ AMT"
//               name="AMT"
//               rules={[{ required: true, message: "ยอดเงินกู้ ไม่ถูกต้อง" }]}
//             >
//               <InputNumber
//                 size="large"
//                 formatter={(value) =>
//                   value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
//                 onKeyDown={(e) => handleKeyDown(e, "AMT")}
//               />
//             </Form.Item>

//             <Form.Item
//               label="จำนวนงวดผ่อนชำระ"
//               name="CNT"
//               rules={[
//                 { required: true, message: "จำนวนงวดผ่อนชำระ ไม่ถูกต้อง" },
//               ]}
//             >
//               <Input onKeyDown={(e) => handleKeyDown(e, "CNT")} />
//             </Form.Item>

//             <Form.Item
//               label={`เงินเหลือรับ (ขั้นต่ำ ${formattedMinRemain})`}
//               name="REMAIN"
//               rules={[
//                 () => ({
//                   validator(_, value) {
//                     if (value > newloan?.MIN_REMAIN) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error("เงินเหลือรับไม่ถูกต้อง"));
//                   },
//                 }),
//               ]}
//             >
//               <PatternFormat
//                 value={newloan?.REMAIN}
//                 format="###,###.##"
//                 displayType="text"
//               />
//             </Form.Item>

//             <Form.Item
//               label="วิธีส่งชำระ"
//               name="PAYMENT_TYPE"
//               rules={[{ required: true, message: "ยอดเงินกู้ ไม่ถูกต้อง" }]}
//             >
//               <Radio.Group
//                 options={[
//                   { label: "ส่งเงินต้นคงที่", value: 2 },
//                   { label: "ส่งแฟลตเรต", value: 1 },
//                 ]}
//                 optionType="button"
//                 buttonStyle="solid"
//                 onChange={onPayMentChange}
//               />
//             </Form.Item>
//           </div>

//           <div className="div-form-control">
//             <Form.Item>
//               <Button htmlType="button" onClick={ResetForm}>
//                 รีเซ็ต
//               </Button>
//               <Button type="primary" htmlType="submit">
//                 ยืนยัน
//               </Button>
//             </Form.Item>
//           </div>
//         </Form>
//       </Card>
//       <div className="col-12 mt-2">
//         <Card className="my-card mb-2">
//           <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "red" }}>
//             {JSON.stringify(newloan, null, 2)}
//           </pre>
//         </Card>
//       </div>
//     </GeneralPage>
//   );
// };

// export default RequestForm;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Input, InputNumber, Radio, message } from "antd";
import Swal from "sweetalert2";
import { NumericFormat, PatternFormat } from "react-number-format";
import * as actions from "../app/actions/main";
import MyLoader from "../components/custom/MyLoader";
import "../assets/styles/request-form.scss";
import GeneralPage from "./GeneralPage.jsx";

const RequestForm = (props) => {
  const { next, setStep } = props;
  const dispatch = useDispatch();
  const { item: user } = useSelector((state) => state.user.user);
  const { isLoading, item: newloan } = useSelector(
    (state) => state.main.newloan
  );

  const [form] = Form.useForm();

  const performCalculations = (loan, id, value) => {
    let {
      AMT,
      MAX_AMT,
      CNT,
      DAYS,
      DAYS_IN_YEAR,
      DOG,
      INT_RATE,
      PAYMENT_TYPE,
      PPM,
      MAX_PPM,
      MIN_REMAIN,
      REMAIN,
      TON,
      TOT_BALN,
    } = loan;
    let last_ton = 0;
    let last_dog = 0;
    let int_rate_m = INT_RATE / 100 / 12;

    console.log(`performCalculations :${id}`);
    console.log("Performing calculations with updatedLoan:", loan);

    switch (id) {
      case "AMT": {
        AMT = parseFloat(value);
        break;
      }
      case "CNT": {
        CNT = parseInt(value);
        break;
      }
      case "PAYMENT_TYPE": {
        // CNT = parseInt(value);
        break;
      }
      default: {
        console.log("default");
      }
    }

    if (PAYMENT_TYPE == 1) {
      fn01();
    } else {
      fn02();
    }

    function fn01() {
      // message.info("flat");
      PPM = (AMT * int_rate_m) / (1 - Math.pow(1 / (1 + int_rate_m), CNT));
      DOG = (AMT * DAYS * INT_RATE) / 100 / DAYS_IN_YEAR;
      TON = PPM - DOG;
    }

    function fn02() {
      // message.info("ต้นคงที่");
      TON = AMT / CNT;
      var ton_sum = Math.floor(AMT / TON) * TON;
      last_ton = AMT - ton_sum;
      DOG = (AMT * DAYS * INT_RATE) / 100 / DAYS_IN_YEAR;
      last_dog = (last_ton * DAYS * INT_RATE) / 100 / DAYS_IN_YEAR;
      PPM = TON + DOG;
    }

    REMAIN = TOT_BALN - PPM; //.toFixed(2));
    dispatch(
      actions.updateNewLoan({
        ...loan,
        AMT,
        PPM,
        REMAIN,
        TON,
        TOT_BALN,
        CNT,
      })
    );
    form.setFieldsValue({ ...loan, AMT, PPM, REMAIN, TON, TOT_BALN });

    if (MAX_PPM < PPM) {
      Swal.fire({
        title: "กรุณาตรวจสอบ!",
        text: `เงินเหลือรับ ${REMAIN} กรุณาตรวจสอบ วงเงินกู้ หรือจำนวนงวด`,
        icon: "error",
      });
    }
    console.log(
      `PAYMENT_TYPE=${PAYMENT_TYPE},TON=${TON},DOG=${DOG},PPM=${PPM},REMAIN=${REMAIN}`
    );
    console.log("after-2", loan);
  };

  useEffect(() => {
    if (user) {
      dispatch(actions.getNewLoan(user.MEMB_CODE));
    }
  }, [user, dispatch]);

  const onFinish = (values) => {
    console.log("Success:", values);
    form
      .validateFields()
      .then(() => {
        dispatch(actions.SaveLoanRequest(newloan));
        Swal.fire({
          title: "บันทึกข้อมูลเรียบร้อย",
          text: "บันทึกข้อมูลเรียบร้อย",
          icon: "success",
        }).then(() => {
          next(null, false);
        });
      })
      .catch(() => {
        setStep(null, true);
        Swal.fire({
          title: "กรุณาตรวจสอบ!",
          text: `เงินเหลือรับ ${newloan.REMAIN} กรุณาตรวจสอบ วงเงินกู้ หรือจำนวนงวด`,
          icon: "error",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      let value = e.target.value.replace(/\$\s?|(,*)/g, "");
      let temp = { ...newloan, [id]: value };
      performCalculations(temp, id, value);
    }
  };

  const onPayMentChange = (e) => {
    let value = e.target.value;
    let updatedLoan = { ...newloan, PAYMENT_TYPE: value };
    performCalculations(updatedLoan, "PAYMENT_TYPE", value);
  };

  const ResetForm = () => {
    message.info("reset");
    let { REMAIN, AMT, CNT, MAX_CNT, TOT_BALN, MAX_AMT, MAX_PPM, MIN_REMAIN } =
      newloan;

    const updatedLoan = {
      ...newloan,
      AMT: MAX_AMT,
      PPM: MAX_PPM,
      REMAIN: MAX_PPM - MIN_REMAIN,
      CNT: MAX_CNT,
    };

    dispatch(actions.updateNewLoan(updatedLoan));
    form.setFieldsValue({
      AMT: MAX_AMT,
      PPM: MAX_PPM,
      REMAIN: MAX_PPM - MIN_REMAIN,
      CNT: MAX_CNT,
    });
  };

  if (isLoading) {
    return <MyLoader />;
  }

  const formattedMinRemain = newloan?.MIN_REMAIN.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <GeneralPage>
      <Card className="my-card request-card">
        <Form
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              event.preventDefault();
            }
          }}
          form={form}
          name="request"
          layout="vertical"
          initialValues={{ ...newloan }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="div-form-group group-1">
            <Form.Item
              label="ยอดเงินกู้ AMT"
              name="AMT"
              rules={[{ required: true, message: "ยอดเงินกู้ ไม่ถูกต้อง" }]}
            >
              <PatternFormat
                value={newloan?.AMT}
                displayType="input"
                thousandSeparator={true}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  form.setFieldsValue({ AMT: floatValue });
                }}
                customInput={InputNumber}
                onKeyDown={(e) => handleKeyDown(e, "AMT")}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="จำนวนงวดผ่อนชำระ"
              name="CNT"
              rules={[
                { required: true, message: "จำนวนงวดผ่อนชำระ ไม่ถูกต้อง" },
              ]}
            >
              <Input onKeyDown={(e) => handleKeyDown(e, "CNT")} />
            </Form.Item>

            <Form.Item
              label={`เงินเหลือรับ (ขั้นต่ำ ${formattedMinRemain})`}
              name="REMAIN"
              rules={[
                () => ({
                  validator(_, value) {
                    if (value > newloan?.MIN_REMAIN) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("เงินเหลือรับไม่ถูกต้อง"));
                  },
                }),
              ]}
            >
              <PatternFormat
                value={newloan?.REMAIN}
                format="###,###.##"
                displayType="text"
              />
            </Form.Item>

            <Form.Item
              label="วิธีส่งชำระ"
              name="PAYMENT_TYPE"
              rules={[{ required: true, message: "ยอดเงินกู้ ไม่ถูกต้อง" }]}
            >
              <Radio.Group
                options={[
                  { label: "ส่งเงินต้นคงที่", value: 2 },
                  { label: "ส่งแฟลตเรต", value: 1 },
                ]}
                optionType="button"
                buttonStyle="solid"
                onChange={onPayMentChange}
              />
            </Form.Item>
          </div>

          <div className="div-form-control">
            <Form.Item>
              <Button htmlType="button" onClick={ResetForm}>
                รีเซ็ต
              </Button>
              <Button type="primary" htmlType="submit">
                ยืนยัน
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
      <div className="col-12 mt-2">
        <Card className="my-card mb-2">
          <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "red" }}>
            {JSON.stringify(newloan, null, 2)}
          </pre>
        </Card>
      </div>
    </GeneralPage>
  );
};

export default RequestForm;
