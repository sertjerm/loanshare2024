import React, { useState } from 'react';
import { InputNumber } from 'antd';


const ScrollableInputNumber = () => {
  const [value, setValue] = useState(0);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const onWheel = (event) => {
    event.preventDefault(); // ป้องกันการเลื่อนหน้าเว็บ
    const delta = Math.sign(event.deltaY);
    setValue((prevValue) => prevValue - delta); // ปรับค่าโดยลดค่า delta
  };

  return (
    <InputNumber
      min={0}
      max={100}
      value={value}
      onChange={onChange}
      onWheel={onWheel}
      step={1}
      style={{ width: 200 }}
    />
  );
};

export default ScrollableInputNumber;
