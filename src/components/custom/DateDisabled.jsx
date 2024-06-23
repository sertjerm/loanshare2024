import React, { useState } from "react";
import { DatePicker, Button, Space } from "antd";

const DateDisabled = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log("datedisabled===", selectedDate);

  const handleSearch = () => {
    //แบบเดียว
    if (selectedDate) {
      onDateSelect(selectedDate.format("YYYY-MM-DD"));
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    onDateSelect(null); //ส่งค่า null เพื่อยกเลิกที่เลือกไว้
    console.log("clearมั้ย", onDateSelect);
  };

  return (
    <>
      <Space direction="verical" size={12}>
        <DatePicker
          placeholder="เลือกวันที่"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button type="dashed" onClick={handleClear}>
          Clear
        </Button>
      </Space>
    </>
  );
};

export default DateDisabled;
