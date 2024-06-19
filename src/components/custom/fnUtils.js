export function daysInYear() {
    const currentYear = new Date().getFullYear();
    const isLeapYear = new Date(currentYear, 1, 29).getMonth() === 1;
    const daysInYear = isLeapYear ? 366 : 365;
    return daysInYear;
  }
  
  export function daysLastMonth(addMonth) {
      //หาวันสุดท้าย ของงวดสุดท้าย โดยการบวกจำนวนงวดเข้าไป
      //now add months
      var now = new Date();
      var now2 = new Date(new Date().setMonth(now.getMonth() + addMonth));
      let month = now2.getMonth(); //+ 1;
      let year = now2.getFullYear();
      return new Date(year, month, 0).getDate();
    }