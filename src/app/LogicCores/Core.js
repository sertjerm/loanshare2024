import * as util from "./jsUtils.js";


export const doCalNewLoan = (fix, member, newloan, exists) => {
  console.log(fix);
  console.log(member);
  console.log(newloan);
  console.log(exists);
  if (fix == "initial") {
    newloan.CONT_TYPE = "00";
  }
  // if (newloan.CONT_TYPE == "00") {
  //   newloan.LOAN_SHARE = "0";
  //   newloan.PAYMET = "2";
  // }
  newloan.MIN_REMAIN = member.MIN_REMAIN;
  // var shrRemain = member.MEMB_CURSHR - newloan.SHRAMT;
  // var shrRemain = member.SHARE_REMAIN2;
  var shrRemain = util.getShrRemain(member, exists);
  // var max_ppm = util.toFixedPoint(

  var max_ppm = util.getMaxPPM(member, exists);
  // console.log("max ppm", max_ppm, max_ppm2);

  // console.log("remain,min_remain,max_ppm", remain, min_remain, max_ppm);
  // getMaxPPM(conts, member, newloan);
  //************** initial General variables ********************* */
  var intRate =
    newloan.CONT_TYPE == "00"
      ? member.INT_RATE
      : util.toFixedPoint(newloan.INT_RATE, 2);

  var vars = {
    ctype: newloan.CONT_TYPE, //ประเภทกู้
    maxCnt: member["COUNT" + newloan.CONT_TYPE], //งวดสูงสุด
    cnt: util.toFixedPoint(newloan.CNT, 0),
    maxAmt: member["SIT" + newloan.CONT_TYPE], //วงเงินสูงสุด
    amt: util.toFixedPoint(newloan.AMT, 0),
    loanShare: newloan.LOAN_SHARE, //กู้หุ้น=1 ปกติ=0
    share_used: 0, //หุ้นที่ใช้ค้ำ
    mshare: newloan.CONT_TYPE == "02" ? 0.15 : 0.1,
    int_rate: parseFloat(intRate) / 100, //อัตราดอกเบี้ย
    int_rate_m: intRate / 1200,
    paymet: newloan.PAYMET, //วิธีชำระ 1=flat,2=ต้นคงที่
    ton: 0,
    last_ton: 0,
    dog: 0,
    last_dog: 0,
    ppm: max_ppm - member.MIN_REMAIN, //- 10, //ป้องกันการติดลบ
    days: util.dayCount(),
    days_in_year: new Date().getFullYear() % 4 === 0 ? 366 : 365,
    //days_in_year: 365,
  };

  let {
    ctype,
    cnt,
    maxCnt,
    amt,
    maxAmt,
    mshare,
    loanShare,
    share_used,
    int_rate,
    int_rate_m,
    paymet,
    ton,
    last_ton,
    dog,
    last_dog,
    ppm,
    days,
    days_in_year,
  } = vars;
  // if
  // //ถ้า คำนวนแบบ flat
  // if (newloan.PAYMET === 1) {
  //   fix = "FLAT";
  // }
  amt = util.toFixedPoint(newloan.AMT, 0);
  switch (fix) {
    // case "LOAN_SHARE": {
    //   console.log("loan_share");
    //   // $scope.newloan.new_ppm = ($scope.newloan.new_amount * $scope.newvars.rate_m) / (1 - Math.pow(1 / (1 + $scope.newvars.rate_m), $scope.newloan.new_count));
    //   // $scope.newloan.new_ppm = $scope.funcRound($scope.newloan.new_ppm,100,'round')
    //   // $scope.newloan.new_dog = $scope.funcRound($scope.newloan.new_amount * ($scope.newvars.days + 1) * $scope.newvars.rate / $scope.newvars.days_in_year,100,'round');
    //   // $scope.newloan.new_ton = $scope.newloan.new_ppm - $scope.newloan.new_dog;
    //   fn01();
    //   break;
    // }
    case "FLAT": {
      console.log("flatrate");
      // $scope.newloan.new_ppm = ($scope.newloan.new_amount * $scope.newvars.rate_m) / (1 - Math.pow(1 / (1 + $scope.newvars.rate_m), $scope.newloan.new_count));
      // $scope.newloan.new_ppm = $scope.funcRound($scope.newloan.new_ppm,100,'round')
      // $scope.newloan.new_dog = $scope.funcRound($scope.newloan.new_amount * ($scope.newvars.days + 1) * $scope.newvars.rate / $scope.newvars.days_in_year,100,'round');
      // $scope.newloan.new_ton = $scope.newloan.new_ppm - $scope.newloan.new_dog;
      fn01();
      break;
    }
    case "AMT":
      amt = newloan.AMT;
      //   //คำนวณปกติ
      if (paymet == 1) {
        // 1 flat

        ppm = (amt * int_rate_m) / (1 - Math.pow(1 / (1 + int_rate_m), cnt));
        dog = (amt * (days + 1) * int_rate) / days_in_year;
        ton = ppm - dog;
      } else {
        // // 2 ต้นคงที่
        // ton = amt / cnt;
        // dog = (amt * (days + 1) * int_rate) / days_in_year;
        // ppm = ton + dog;
        fn02();
      }
      break;
    case "CNT":
      amt = util.toFixedPoint(newloan.AMT, 0);
      cnt = newloan.CNT;
      // amt = maxAmt;

      //   //คำนวณปกติ
      if (paymet == 1) {
        // 1 flat
        fn01();
        // ppm = (amt * int_rate_m) / (1 - Math.pow(1 / (1 + int_rate_m), cnt));
        // dog = (amt * (days + 1) * int_rate) / days_in_year;
        // ton = ppm - dog;
        break;
      } else {
        // // 2 ต้นคงที่
        // ton = amt / cnt;
        // dog = (amt * (days + 1) * int_rate) / days_in_year;
        // ppm = ton + dog;
        fn02();
        break;
      }

    case "TON": //fix ton, cnt =>amt change
      cnt = newloan.CNT;
      // ถ้าระบุต้น ดอกไม่เปลี่ยน แต่งวดเปลี่ยน ************
      // amt = util.toFixedPoint(newloan.AMT, 0);
      // ton = util.toFixedPoint(newloan.TON, 0);
      ton = util.xCeil(newloan.TON, 1);
      // amt = ton * cnt;
      // cnt = util.xCeil(amt / ton, 1);
      amt = ton * cnt;
      // amt = (cnt * ppm) / (1 + (cnt * days * int_rate) / days_in_year); //FORM CHATGTP
      // cnt = Math.ceil(amt / ton);
      fn02();
      // // ton = amt / cnt;
      // dog = (amt * (days + 1) * int_rate) / days_in_year;
      // ppm = ton + dog;
      // // }
      break;
    // case "PERMONTH":
    //   // onCalLoan("PPM");
    //   break;
    // case "SHARE":
    //   console.log("SHARE");
    //   break;
    // case "LOAN_SHARE":
    default:
      // amt = maxAmt;
      cnt = maxCnt;
      // if()

      console.log(maxAmt, maxCnt);
      console.log(member["SIT" + newloan.CONT_TYPE], member["COUNT" + ctype]);

      //initial
      if (paymet == 1) {
        // 1 flat
        if (loanShare == "1") {
          amt = shrRemain * 0.9;
          cnt = util.MAXCOUNTS[ctype];
          // if (ctype == "02") {
          //   cnt = 150;
          // }
        } else {
          amt = (ppm * (1 - Math.pow(1 / (1 + int_rate_m), cnt))) / int_rate_m;
        }
        fn01();
        break;
      } else {
        if (loanShare == "1") {
          amt = shrRemain * 0.9;
          cnt = util.MAXCOUNTS[ctype];
          // if (ctype == "02") {
          //   cnt = 150;
          // }
        } else {
          amt = (cnt * ppm) / (1 + (cnt * days * int_rate) / days_in_year); //FORM CHATGTP

          // // $scope.newvars.factor = ($scope.newvars.days + 1) * $scope.newvars.rate / $scope.newvars.days_in_year;
          // let factor = (days * int_rate) / days_in_year;
          // // $scope.newLoan.new_amount = $scope.newLoan.new_ppm / ((1 / $scope.newLoan.new_count) + $scope.newvars.factor);
          // let amt2 = ppm / (1 / cnt + factor);
          // console.log(factor, amt, amt2);
        }
        fn02();
        break;
      }
  } //switch
  //****************************** กู้หุ้น **********************************/
  // if (loanShare == "1") {
  //   amt = shrRemain * 0.9;
  //   cnt = util.MAXCOUNTS[ctype];
  //   // if (ctype == "02") {
  //   //   cnt = 150;
  //   // }
  // }

  //****************************** flatrate **********************************/
  function fn01() {
    console.log("fn01,amt,cnt,ton", amt, cnt, ton);
    amt =
      ctype == "03"
        ? (amt = util.xFloor(amt, 10000))
        : (amt = util.xFloor(amt, 1000));
    if (amt > maxAmt) {
      amt = maxAmt;
    }
    if (amt < 0) {
      amt = 0;
    }
    // $scope.newloan.new_ppm = ($scope.newloan.new_amount * $scope.newvars.rate_m) / (1 - Math.pow(1 / (1 + $scope.newvars.rate_m), $scope.newloan.new_count));
    // $scope.newloan.new_ppm = $scope.funcRound($scope.newloan.new_ppm,100,'round')
    // $scope.newloan.new_dog = $scope.funcRound($scope.newloan.new_amount * ($scope.newvars.days + 1) * $scope.newvars.rate / $scope.newvars.days_in_year,100,'round');
    // $scope.newloan.new_ton = $scope.newloan.new_ppm - $scope.newloan.new_dog;
    ppm = (amt * int_rate_m) / (1 - Math.pow(1 / (1 + int_rate_m), cnt));
    ppm = util.toFixedPoint(ppm, 2);

    // ppm = (amt * int_rate_m) / (1 - Math.pow(1 / (1 + int_rate_m), cnt));
    // dog = (amt * (days + 1) * int_rate) / days_in_year;
    dog = (amt * days * int_rate) / days_in_year;
    ton = ppm - dog;
    console.log("fn01,ton,dog,ppm,amt,cnt", ton, dog, ppm, amt, cnt);
  }
  //****************************** fix ton **********************************/
  function fn02() {
    console.log("fn02,amt,cnt,ton", amt, cnt, ton);

    //amt = util.xFloor(amt, 1000);
    amt =
      ctype == "03"
        ? (amt = util.xFloor(amt, 10000))
        : (amt = util.xFloor(amt, 1000));

    if (amt > maxAmt) {
      amt = maxAmt;
    }
    if (amt < 0) {
      amt = 0;
    }
    if (fix === "TON") {
      ton = ton; //util.toFixedPoint(ton, 0);
    } else {
      // ppm = ton + dog;
      console.log("1111 amt,cnt,ton", amt, cnt, ton);
      // ton = util.xCeil(amt / cnt, 0);
      ton = util.xCeil(amt / cnt, 1);
      // //ปัดต้น ต้องคำนวน cnt ใหม่
      // cnt = util.xCeil(amt / ton, 1);

      // console.log("2222 -amt,cnt,ton", amt, cnt, ton);
    }
    if (fix != "CNT") {
      // cnt = util.toFixedPoint(amt / ton, 0);
      cnt = Math.ceil(amt / ton);
    }
    // cnt = util.xCeil(amt / ton, 1);
    if (newloan.LOAN_SHARE == "0") {
      if (cnt > maxCnt) {
        cnt = maxCnt;
      }
    }

    console.log("2222 -amt,cnt,ton", amt, cnt, ton);
    // ton = fix == "TON" ? ton : util.xCeil(amt / cnt);

    // console.log(util.xCeil(8846));
    // }
    // หางวดสุดท้าย
    var ton_sum = Math.floor(amt / ton) * ton; //เงินต้นไม่รวมงวดสุดท้าย
    last_ton = amt - ton_sum; //เงินต้นงวดสุดท้าย
    dog = (amt * days * int_rate) / days_in_year;
    var days_in_month = util.daysInMonth(cnt);
    last_dog = (last_ton * days_in_month * int_rate) / days_in_year;
    // $scope.newloan.daysLastMonth = $scope.daysInMonth2($scope.newloan.new_count);
    // $scope.newloan.new_last_dog = $scope.newloan.new_last_ton * ($scope.newloan.daysLastMonth) * $scope.newvars.rate / $scope.newvars.days_in_year;
    ppm = ton + dog;
  }

  newloan.INT_RATE = intRate;
  newloan.AMT = util.xRound(amt, 3);
  newloan.CNT = cnt;
  newloan.TON = util.toFixedPoint(ton, 2);
  // newloan.LAST_TON = last_ton;
  newloan.DOG = util.toFixedPoint(dog, 2);
  // newloan.LAST_DOG = util.toFixedPoint(last_dog, 2);
  newloan.PPM = util.toFixedPoint(ppm, 2);
  newloan.LASTPAID =
    "days=" +
    days +
    ", ต้น=" +
    util.toFixedPoint(last_ton, 0) +
    " ,ดอก=" +
    util.toFixedPoint(last_dog, 2);
  newloan.SHARE_USED =
    newloan.LOAN_SHARE == 1
      ? util.xRound(amt, 3)
      : util.xRound(amt, 3) * mshare;
  // var new_remain = member.REMAIN2 - ppm; // - member.MIN_REMAIN;
  var new_remain = max_ppm - ppm;
  // var remain_share = member.MEMB_CURSHR - (newloan.SHRAMT + newloan.SHARE_USED);
  var remain_share = shrRemain - newloan.SHARE_USED;
  console.log(
    "curshr,SHRAMT,shr_used",
    member.MEMB_CURSHR,
    newloan.SHRAMT,
    newloan.SHARE_USED,
    remain_share
  );
  newloan.REMAIN = util.toFixedPoint(new_remain, 2);
  newloan.SHARE_REMAIN = remain_share;

  // newloan.SHARE_USED = amt; // * mshare;

  console.log("Core", newloan);
  // if (newloan.AMT == 0) {
  //   // alert(newloan.AMT);
  //   console.log(newloan);
  // }
  return newloan;
};
