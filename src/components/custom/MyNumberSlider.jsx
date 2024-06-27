import React, { useState } from "react";
import { Box, Input, Slider, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { message } from "antd";
import "../../assets/styles/my-number-slider.scss";
import { parserNumber } from "./jsUtils";

const MyNumberSlider = (props) => {
  let { min, max, step, name, color } = props;
  const [val, setVal] = useState(max);

  const handleSliderInput = (e, newValue) => {
    onSetValue(newValue);
  };

  const handleInputChange = (values) => {
    let value = values.floatValue;
    console.log("value,max", value, max);
    if (value > max) {
      // message.error(`วงเงินกู้สูงสุดคือ ${max}`);
      value = max;
    }
    if (value <= 0) {
      value = min;
    }
    onSetValue(value);
  };

  const onSetValue = (v) => {
    setVal(v);
    props.handleChange(name, v);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }} className="my-number-slider">
      <Typography variant="h4" gutterBottom>
        <NumericFormat
          value={val}
          thousandSeparator=","
          decimalScale={0}
          customInput={Input}
          onValueChange={handleInputChange}
          className="my-input-slider"
          allowNegative={false} // ไม่อนุญาตให้ป้อนค่าติดลบ
        />
      </Typography>
      <Slider
        value={typeof val === "number" ? val : 0}
        onChange={handleSliderInput}
        min={min}
        max={max}
        step={step}
        aria-labelledby="slider-with-input"
      />
      <Box display="flex" justifyContent="space-between">
        <Typography>
          ขั้นต่ำ{" "}
          <NumericFormat
            value={min}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
        <Typography>
          สูงสุด{" "}
          <NumericFormat
            value={max}
            displayType={"text"}
            thousandSeparator={true}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default MyNumberSlider;
