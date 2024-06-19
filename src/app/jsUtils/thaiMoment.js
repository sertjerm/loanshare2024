import React from "react";
import moment from "moment";
import "moment/locale/th";

// ตั้งค่า moment ให้ใช้ภาษาไทย
moment.locale("th");

// ฟังก์ชันแปลงวันที่
export const formatDateInThai = (dateString) => {
  const date = moment(
    parseInt(dateString.replace(/\/Date\((\d+)\+\d+\)\//, "$1"))
  );
  const buddhistYear = date.year();// + 543; // เพิ่ม 543 ปีเพื่อให้เป็นปีพุทธศักราช

  // ตั้งค่าปีใหม่ให้กับวันที่
  date.year(buddhistYear);

  // ฟอร์แมตวันที่ให้อยู่ในรูปแบบที่ต้องการและใช้ชื่อเดือนภาษาไทยเต็มรูปแบบ
  const formattedDate = date.format("D MMMM YYYY  HH:mm:ss น.");

  // แทนที่ชื่อเดือนภาษาอังกฤษด้วยชื่อเดือนภาษาไทย
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let finalFormattedDate = formattedDate;

  for (let i = 0; i < 12; i++) {
    finalFormattedDate = finalFormattedDate.replace(
      englishMonths[i],
      thaiMonths[i]
    );
  }

  return finalFormattedDate;
};
