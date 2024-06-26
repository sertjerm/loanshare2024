import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
  message,
} from "antd";
import Swal from "sweetalert2";
import { NumericFormat, PatternFormat } from "react-number-format";
import * as actions from "../app/actions/main";
import MyLoader from "../components/custom/MyLoader";
import "../assets/styles/request-form.scss";
import * as util from "../components/custom/jsUtils.js";
import GeneralPage from "./GeneralPage.jsx";
import MyNumberSlider from "../components/custom/MyNumberSlider.jsx";
import { Typography } from "@mui/material";
import SwitchPayment from "../components/custom/SwitchPayment.jsx";

// Formatter function to handle thousand separators correctly
const numberFormatter = (value) => {
  if (!value) return "";
  const parts = value.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1] ? `.${parts[1]}` : "";
  return `${integerPart}${decimalPart}`;
};

// Parser function to remove formatting
const numberParser = (value) => value.replace(/\$\s?|(,*)/g, "");

const RequestForm = (props) => {
  const { next, prev, setStep } = props;
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
    // Update the form with new values
    form.setFieldsValue({ ...loan, AMT, PPM, REMAIN, TON, TOT_BALN });

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

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await form.validateFields();
      const ret = await dispatch(actions.SaveLoanRequest(newloan));
      if (ret !== null) {
        Swal.fire({
          title: "บันทึกข้อมูลเรียบร้อย",
          text: "บันทึกข้อมูลเรียบร้อย",
          icon: "success",
        }).then(() => {
          next(null, false);
        });
      } else {
        throw new Error("SaveLoanRequest returned null");
      }
    } catch (error) {
      setStep(null, true);
      Swal.fire({
        title: "กรุณาตรวจสอบ!",
        text: `เงินเหลือรับ ${newloan.REMAIN} กรุณาตรวจสอบ วงเงินกู้ หรือจำนวนงวด`,
        icon: "error",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPayMentChange = (e) => {
    let value = e.target.value;
    let updatedLoan = { ...newloan, PAYMENT_TYPE: value };
    performCalculations(updatedLoan, "PAYMENT_TYPE", value);
  };
  // const onPayMentChange = (checked) => {
  //   const value = checked ? 2 : 1;
  //   const updatedLoan = { ...newloan, PAYMENT_TYPE: value };
    
  //   performCalculations(updatedLoan, "PAYMENT_TYPE", value);
  //     // Update the form field value
  //     form.setFieldsValue({ PAYMENT_TYPE: value });
  // };
  const ResetForm = () => {
    // message.info("reset");
    let {
      REMAIN,
      AMT,
      CNT,
      MAX_CNT,
      TOT_BALN,
      MAX_AMT,
      MAX_PPM,
      PAYMENT_TYPE,
    } = newloan;

    const updatedLoan = {
      ...newloan,
      AMT: MAX_AMT,
      PPM: MAX_PPM,
      CNT: MAX_CNT,
      PAYMENT_TYPE:PAYMENT_TYPE,
    };
    dispatch(actions.updateNewLoan(updatedLoan));
  // Update the form fields with the new values
  form.setFieldsValue({
    AMT: updatedLoan.AMT,
    PPM: updatedLoan.PPM,
    CNT: updatedLoan.CNT,
    PAYMENT_TYPE: updatedLoan.PAYMENT_TYPE,
  });
  };
  const handleChange = (id, value) => {
    console.log("handleChange id,value=", id, value);
    let maxVal =newloan[`${id}_MAX`];
    if(value>maxVal){
      value=maxVal;
         // Update the form with new values
    form.setFieldsValue({ ...loan, AMT:value });
    message.info(`value>maxVal ${value} > ${maxVal}`)
    }
    let temp = { ...newloan, [id]: value };
    performCalculations(temp, id, value);
   
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
            <Form.Item label="ยอดเงินกู้ AMT" name="AMT">
              <MyNumberSlider
                min={1000}
                max={newloan?.MAX_AMT}
                step={1000}
                label="วงเงินกู้"
                name="AMT"
                handleChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="จำนวนงวดผ่อนชำระ" name="CNT">
              <MyNumberSlider
                min={10}
                max={newloan?.MAX_CNT}
                step={5}
                name="CNT"
                label="จำนวนงวด"
                handleChange={handleChange}
                // color="secondary"
              />
            </Form.Item>
            <Form.Item
              label="วิธีส่งชำระ"
              name="PAYMENT_TYPE"
              rules={[{ required: true, message: "ยอดเงินกู้ ไม่ถูกต้อง" }]}
            >
              <Radio.Group
                options={[
                  { label: "ส่งแฟลตเรต", value: 1 },
                  { label: "ส่งเงินต้นคงที่", value: 2},
                
                ]}
                optionType="button"
                buttonStyle="solid"
                onChange={onPayMentChange}
              />
            
            </Form.Item>
            {/* <Form.Item
              label="วิธีส่งชำระ"
              name="PAYMENT_TYPE"
              valuePropName="checked"
              // rules={[{ required: true, message: "ยอดเงินกู้ ไม่ถูกต้อง" }]}
            >
              <Switch
                checkedChildren="ส่งเงินต้นคงที่"
                unCheckedChildren="ส่งแฟลตเรต"
                checked={newloan?.PAYMENT_TYPE === 2}
                
                onChange={onPayMentChange}
              />{newloan?.PAYMENT_TYPE}
            </Form.Item> */}

            <Form.Item label={`ส่งต่อเดือนงวดแรกโดยประมาณ`} name="PPM">
              <Typography variant="h4" gutterBottom>
                <NumericFormat
                  value={newloan?.PPM}
                  displayType="text"
                  thousandSeparator
                  decimalScale={2}
                />
              </Typography>
              {/* {`ต้น=${newloan?.TON.toFixed(2)}-ดอก=${newloan?.DOG.toFixed(2)}`} */}
            </Form.Item>
            {  newloan?.REMAIN < newloan?.MIN_REMAIN &&  <Form.Item
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
        <Typography variant="h4" gutterBottom>
                <NumericFormat
                className={
                    newloan?.REMAIN < newloan?.MIN_REMAIN ? "text-danger" : ""
                  }
                  value={newloan?.REMAIN}
                  displayType="text"
                  thousandSeparator
                  decimalScale={2}
                />
              </Typography>
            </Form.Item>}
          </div>

          <div className="div-form-control">
            <Form.Item>
              {/* <Button htmlType="button" onClick={ResetForm}>
                รีเซ็ต
              </Button> */}
              <Button type="primary" htmlType="submit">
                ยืนยัน
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
      {/* <div className="col-12 mt-2">
        <Card className="my-card mb-2">
          <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "red" }}>
            {JSON.stringify(newloan, null, 2)}
          </pre>
        </Card>
      </div> */}
    </GeneralPage>
  );
};

export default RequestForm;
