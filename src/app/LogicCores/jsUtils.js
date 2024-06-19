//ให้สำหรับปัดเศษตามหลัก
export const roundPoint = {
    0: 1,
    1: 10,
    2: 100,
    3: 1000,
    4: 10000,
    5: 100000,
  };
  export const MAXCOUNTS = { "00": 0, "02": 150, "03": 360 };
  export function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  export function getNumericValue(value) {
    return isNumber(value) ? parseFloat(value) : 0;
  }
  export function toFixedPoint(v, point, option) {
    var mp = roundPoint[point] || point;
  
    // var ret = v > 0 ? parseFloat(v) : 0;
    var ret = getNumericValue(v);
    var x = Math.round(ret * mp) / mp;
    if (option == "ceil") {
      var x = Math.ceil(ret * mp) / mp;
    }
    if (option == "floor") {
      x = Math.floor(ret * mp) / mp;
    }
  
    return x;
  }
  export function xRound(v, point) {
    var mp = roundPoint[point] || point;
  
    // var ret = v > 0 ? parseFloat(v) : 0;
    var ret = getNumericValue(v);
    var x = Math.round(ret / mp) * mp;
    return x;
  }
  export function xCeil(v, point) {
    var mp = roundPoint[point] || point;
  
    // var ret = v > 0 ? parseFloat(v) : 0;
    var ret = getNumericValue(v);
    var x = Math.ceil(ret / mp) * mp;
    return x;
  }
  export function xFloor(v, point) {
    var mp = roundPoint[point] || point;
  
    // var ret = v > 0 ? parseFloat(v) : 0;
    var ret = getNumericValue(v);
    var x = Math.floor(ret / mp) * mp;
    return x;
  }
  
  export function daysInMonth(addMonth) {
    //หาวันสุดท้าย ของงวดสุดท้าย โดยการบวกจำนวนงวดเข้าไป
    //now add months
    var now = new Date();
    var now2 = new Date(new Date().setMonth(now.getMonth() + addMonth));
    let month = now2.getMonth(); //+ 1;
    let year = now2.getFullYear();
    return new Date(year, month, 0).getDate();
  }
  export function dayCount(month, year) {
    if (month == undefined || year == undefined) {
      var now = new Date();
      month = now.getMonth() + 1;
      year = now.getFullYear();
    }
  
    return new Date(year, month, 0).getDate();
  }
  
  // formatter and parser input number
  // export const formatterNumber = (val) => {
  //   if (!val) return 0;
  //   return `${val}`
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  //     .replace(/\.(?=\d{0,2}$)/g, ",");
  // };
  
  // export const parserNumber = (val) => {
  //   if (!val) return 0;
  //   return Number.parseFloat(
  //     val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
  //   ).toFixed(2);
  // };
  
  export const formatterNumber = (value) => {
    // if (!val) return "0"; // Set default value to "0.00" if val is falsy
    // const parts = val.toString().split(".");
    // const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // const decimalPart = parts.length > 1 ? parts[1] : "00";
    // return `${integerPart}.${decimalPart}`;
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  export const parserNumber = (value) => {
    return value.replace(/\$\s?|(,*)/g, "");
    // // Remove commas and trim spaces
    // const cleanedValue = val.replace(/,/g, "").trim();
  
    // // Parse the cleaned value as a float with two decimal places
    // const parsedValue = parseFloat(cleanedValue); //.toFixed(2);
  
    // // Ensure the result is a valid number, or return 0.00 if parsing fails
    // return isNaN(parsedValue) ? "0" : parsedValue;
  };
  
  export function getMaxPPM(member, exists) {
    let sumOfPPM = 0;
    if (exists != null) {
      sumOfPPM = exists
        .filter((item) => item.IS_SELECT == 1)
        .reduce((sum, item) => sum + item.PPM, 0);
    }
  
    var max_ppm = toFixedPoint(member.REMAIN - sumOfPPM, 2);
    return max_ppm;
  }
  export function getShrRemain(member, exists) {
    // const ret = exists
    //   .filter((item) => item.IS_SELECT == 1)
    //   .reduce((sum, item) => sum + item.SHARE_USED, 0);
    var ret = toFixedPoint(member.MEMB_CURSHR - getShrAmt(exists), 2);
    return ret;
  }
  export function getPPM(exists) {
    const sumOfPPM = exists
      .filter((item) => item.IS_SELECT == 1)
      .reduce((sum, item) => sum + item.PPM, 0);
  
    return sumOfPPM;
  }
  
  export function getShrAmt(exists) {
    if (exists != null) {
      const sumShr = exists
        .filter((item) => item.IS_SELECT == 1)
        .reduce((sum, item) => sum + item.SHARE_USED, 0);
  
      return sumShr;
    } else {
      return 0;
    }
  }
  export function getBalAmt(exists) {
    const sumBal = exists
      .filter((item) => item.IS_SELECT == 1)
      .reduce((sum, item) => sum + item.CONT_BALAMT, 0);
  
    return sumBal;
  }
  