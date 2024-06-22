//action/main.jsx
import axios from "axios";
import { SERVICE_URL, SHEET_SERVICE } from "../constants/APP_ROOT";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "../reducers/userSlice";
import {
  getMemberRequest,
  getMemberSuccess,
  getMemberFailure,
  getMenuFailure,
  getMenuRequest,
  getMenuSuccess,
  newloanRequest,
  newloanSuccess,
  newloanFailure,
  getRequestListRequest,
  getRequestListSuccess,
  getRequestListFailure,
  newloanUpdate,
  savedloanRequest,
  savedloanSuccess,
  savedloanFailure,
} from "../reducers/mainSlice";
import { useDispatch } from "react-redux";
// import axios from "axios";
// import { loginRequest, loginSuccess, loginFailure } from "./slice"; // Adjust the import as needed
// import { SERVICE_URL } from "./config"; // Adjust the import as needed

// ฟังก์ชันสำหรับการ login
export const loginApi = (data) => {
  console.log("json-stringify", JSON.stringify(data));

  // ตั้งค่า config สำหรับคำขอ HTTP POST
  var config = {
    method: "post",
    url: `${SERVICE_URL}/JwtLogin`, // ใช้ Template Literal สำหรับ URL
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data), // แปลงข้อมูลเป็น JSON string
  };

  // ส่งคืนฟังก์ชัน asynchronous ที่รับ dispatch เป็นอาร์กิวเมนต์
  return async (dispatch) => {
    dispatch(loginRequest()); // Dispatch action เพื่อเริ่มการ login

    try {
      // ส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์
      const response = await axios(config);
      let user = null;

      // ตรวจสอบสถานะการตอบสนองจากเซิร์ฟเวอร์
      if (response.data.status == 200) {
        user = response.data.data; // เก็บข้อมูลผู้ใช้จากการตอบสนอง
        console.log("jwtLogin success", user);
        dispatch(loginSuccess({ data: user })); // Dispatch action เมื่อ login สำเร็จ
      } else {
        console.error("jwtLogin failed with status:", response.status);
        dispatch(loginFailure()); // Dispatch action เมื่อ login ล้มเหลว
      }
    } catch (error) {
      // จัดการข้อยกเว้นที่อาจเกิดขึ้น
      console.error("jwtLogin error:", error);
      dispatch(loginFailure()); // Dispatch action เมื่อ login ล้มเหลว
    }
  };
};

export const logoutApi = () => {
  console.log("logout");
  const url = SERVICE_URL + "/JwtLogout";
  return async (dispatch) => {
    await axios
      .get(url, { async: true })
      .then(function (response) {
        console.log("logout result= ", response);
        dispatch(logout());
        // สามารถทำงานเพิ่มเติมหลังจาก logout ได้ตามต้องการ
      })

      .catch(function (ex) {
        console.log("Error in logoutApi:", ex);
      });
  };
};

// ฟังก์ชันสำหรับการดึงเมนูจาก Google Sheets
export const getMenu = () => {
  // ตั้งค่า URL สำหรับการดึงข้อมูลเมนู
  let url =
    SHEET_SERVICE +
    "getGenericSheetJson?sheetid=1fM6UWNSCG_quUuTDE91GIC2l2qWNHiOZjUJDVWaO844&range=menu!A1:E20";

  // ส่งคืนฟังก์ชัน asynchronous ที่รับ dispatch เป็นอาร์กิวเมนต์
  return async (dispatch) => {
    dispatch(getMenuRequest()); // Dispatch action เพื่อเริ่มการดึงเมนู

    try {
      // ส่งคำขอ HTTP GET ไปยังเซิร์ฟเวอร์
      const response = await axios.get(url, { async: true });

      // แปลงข้อมูลที่ได้รับจากเซิร์ฟเวอร์เป็น JSON
      let data = JSON.parse(response.data);

      // ลบแถวแรกออก (สมมติว่าแถวแรกเป็น header)
      data.shift();

      // กรองข้อมูลเพื่อแสดงเฉพาะเมนูที่มีการตั้งค่า display เป็น "show"
      data = data.filter((item) => item.display === "show");

      // จัดเรียงข้อมูลเมนูตามค่า order
      data.sort((a, b) => parseInt(a.order) - parseInt(b.order));

      console.log("getMenu success", data);
      dispatch(getMenuSuccess({ data: data })); // Dispatch action เมื่อดึงเมนูสำเร็จ
    } catch (ex) {
      // จัดการข้อยกเว้นที่อาจเกิดขึ้น
      console.log("getMenu error:", ex);
      dispatch(getMenuFailure()); // Dispatch action เมื่อดึงเมนูล้มเหลว
    }
  };
};

export const getMemberStr = (memb_code) => {
  console.log(`getMember ${memb_code}`);
  const url = `${SERVICE_URL}/SearchMember?mb_code=${memb_code}`;
  console.log(url);
  return async (dispatch) => {
    dispatch(getMemberRequest());
    let data = null;
    await axios
      .get(url, { async: true })
      .then(function (response) {
        data = JSON.parse(response.data);

        console.log("getMember success", data);
        dispatch(getMemberSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" getMember error : ", ex);
        dispatch(getMemberFailure());
      });
  };
};

export const getMember = (memb_code) => {
  console.log(`getMember ${memb_code}`);

  return async (dispatch, getState) => {
    const token = getState()?.user?.user?.item?.TOKEN;
    console.log("user token=", token, getState());
    const url = `${SERVICE_URL}/GetMember?mb_code=${memb_code}&token=${token}`;
    console.log(url);
    dispatch(getMemberRequest());
    let config = {
      method: "get",
      async: true,
      url: url,
      headers: {
        //  Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    console.log("config=", config);
    // let data = null;
    await axios
      .request(config)
      .then(function (response) {
        console.log(response);
        let data = response.data.data;

        console.log("getMember success", data);
        dispatch(getMemberSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" getMember error : ", ex);
        dispatch(getMemberFailure());
      });
  };
};
// actions.js
export const updateNewLoan = (loan) => (dispatch) => {
  dispatch(newloanUpdate({ data: loan }));
};

export const getNewLoan = (memb_code) => {
  console.log(`getNewLoan ${memb_code}`);
  const url = `${SERVICE_URL}/getNewLoan?mb_code=${memb_code}`;
  console.log(url);

  return async (dispatch, getState) => {
    const token = getState()?.user?.user?.item?.TOKEN;
    console.log("user token=", token, getState());
    dispatch(newloanRequest());
    let config = {
      method: "get",
      async: true,
      url: url,
      headers: {
        //  Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    console.log("config=", config);
    // let data = null;
    await axios
      .request(config)
      .then(function (response) {
        console.log(response);
        let data = response.data.data;

        console.log("getNewLoan success", data);
        dispatch(newloanSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" getNewLoan error : ", ex);
        dispatch(newloanFailure());
      });
  };
};

export const GetLoanRequests = (status) => {
  console.log(`GetLoanRequests ${status}`);
  // ?status=${status}
  const url = `${SERVICE_URL}GetLoanRequests`; // Template literal for URL construction
  console.log(url);
  return async (dispatch) => {
    dispatch(getRequestListRequest());
    // dispatch(getMenuRequest());
    let data = null;
    await axios
      .get(url, { async: true })
      .then(function (response) {
        data = response.data.data;

        console.log("GetLoanRequests success", data);
        dispatch(getRequestListSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" GetLoanRequests error : ", ex);
        dispatch(getRequestListFailure());
      });
  };
};

// ฟังก์ชันสำหรับการ SaveLoanRequest
export const SaveLoanRequest = (data) => {
  console.log("SaveLoanRequest", JSON.stringify(data));

  // ตั้งค่า config สำหรับคำขอ HTTP POST
  var config = {
    method: "post",
    url: `${SERVICE_URL}/SaveLoanRequest`, // ใช้ Template Literal สำหรับ URL
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data), // แปลงข้อมูลเป็น JSON string
  };

  return async (dispatch) => {
    dispatch(savedloanRequest()); // Dispatch action เพื่อเริ่มการ login

    try {
      // ส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์
      const response = await axios(config);
      console.log("SaveLoanRequest response=",response);

      // ตรวจสอบสถานะการตอบสนองจากเซิร์ฟเวอร์
      if (response.data.status == 200) {
        let saved_req = response.data.saved_req; // เก็บข้อมูลผู้ใช้จากการตอบสนอง
        console.log("SaveLoanRequest success", saved_req);
        dispatch(savedloanSuccess({ data: saved_req })); // Dispatch action เมื่อ login สำเร็จ
      } else {
        console.log("jwtLogin failed with status:", response.status);
        dispatch(savedloanFailure()); // Dispatch action เมื่อ login ล้มเหลว
      }
    } catch (error) {
      // จัดการข้อยกเว้นที่อาจเกิดขึ้น
      console.log("SaveLoanRequest error:", error);
      dispatch(savedloanFailure()); // Dispatch action เมื่อ login ล้มเหลว
    }
  };
};


// ฟังก์ชันสำหรับการ UpdateLoanRequest
export const UpdateLoanRequest = (data) => {
  console.log("UpdateLoanRequest", JSON.stringify(data));

  // ตั้งค่า config สำหรับคำขอ HTTP POST
  var config = {
    method: "post",
    url: `${SERVICE_URL}/UpdateLoanRequest`, // ใช้ Template Literal สำหรับ URL
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data), // แปลงข้อมูลเป็น JSON string
  };

  return async (dispatch) => {
    dispatch(savedloanRequest()); // Dispatch action เพื่อเริ่มการ login

    try {
      // ส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์
      const response = await axios(config);
      console.log("UpdateLoanRequest response=",response);

      // ตรวจสอบสถานะการตอบสนองจากเซิร์ฟเวอร์
      if (response.data.status == 200) {
        let saved_req = response.data.saved_req; // เก็บข้อมูลผู้ใช้จากการตอบสนอง
        console.log("UpdateLoanRequest success", saved_req);
        dispatch(savedloanSuccess({ data: saved_req })); // Dispatch action เมื่อ login สำเร็จ
      } else {
        console.log("jwtLogin failed with status:", response.status);
        dispatch(savedloanFailure()); // Dispatch action เมื่อ login ล้มเหลว
      }
    } catch (error) {
      // จัดการข้อยกเว้นที่อาจเกิดขึ้น
      console.log("UpdateLoanRequest error:", error);
      dispatch(savedloanFailure()); // Dispatch action เมื่อ login ล้มเหลว
    }
  };
};