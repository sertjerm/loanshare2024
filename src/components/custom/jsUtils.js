export function daysInYear() {
  const currentYear = new Date().getFullYear();
  const isLeapYear = new Date(currentYear, 1, 29).getMonth() === 1;
  const daysInYear = isLeapYear ? 366 : 365;
  return daysInYear;
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

export function daysLastMonth(addMonth) {
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

export const formatterNumber = (value) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const parserNumber = (value) => {
  return value.replace(/\$\s?|(,*)/g, "");
};
