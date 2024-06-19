import React, { useState } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
const IntegerStep = (props) => {
    let {min,max,step} = props;
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={min}
          max={max}
          style={{
            margin: "0 16px",
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default IntegerStep;
