import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import GeneralPage from "./GeneralPage";
import { Button, Card } from "antd";
import MyNumberSlider from "../components/custom/MyNumberSlider";
import RequestForm from "./RequestForm";

// // สร้าง marks แบบไดนามิกสำหรับแค่ 10 ค่าในช่วงระหว่าง min และ max
// const generateMarks = (min, max, numSteps) => {
//   const step = (max - min) / (numSteps - 1);
//   const marks = [];
//   for (let i = 0; i < numSteps; i++) {
//     const value = min + step * i;
//     marks.push({ value, label: `${(value / 1000).toLocaleString()}k` });
//   }
//   return marks;
// };

// const marks = generateMarks(min, max, numSteps);

const RequestForm2 = (props) => {
  let { min, max, step, next } = props;
  const [value, setValue] = useState(max);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function valuetext(value) {
    return `${value.toLocaleString()}`;
  }

  return (
    <GeneralPage>
      <Card className="my-card text-center">
        <MyNumberSlider
          min={5000}
          max={1000000}
          step={1000}
          next={next}
          label="วงเงินกู้"
          name="AMT"
        />
        <MyNumberSlider
          min={10}
          max={360}
          step={5}
          next={next}
          label="จำนวนงวด"
           name="CNT"
          // color="secondary"
        />
        <h1>Remain...XXXX </h1>

        <Button type="primary" onClick={() => next()}>
          next
        </Button>
      </Card>
    </GeneralPage>
  );
};

export default RequestForm2;
