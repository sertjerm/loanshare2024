//action/main.jsx
import axios from "axios";
import { SERVICE_URL, SHEET_SERVICE } from "../constants/APP_ROOT";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  getMemberRequest,
  getMemberSuccess,
  getMemberFailure,
  getMenuFailure,
  getMenuRequest,
  getMenuSuccess,
  logout,
  newloanRequest,
  newloanSuccess,
  newloanFailure,
  getRequestListRequest,
  getRequestListSuccess,
  getRequestListFailure,
} from "../reducers/mainSlice";

export const loginApi_bak = (data) => {
  console.log("json-stringify", JSON.stringify(data));

  var config = {
    method: "post",
    url: SERVICE_URL + "/IvrLogin",
    headers: {
      "Content-Type": "application/json",
      //   Cookie: "ASP.NET_SessionId=zwxuhgcls5hnio5ued1p5jf5",
    },
    data: JSON.stringify(data),
  };

  return async (dispatch) => {
    dispatch(loginRequest()); // Dispatching the loginRequest action from the slice
    try {
      const response = await axios(config);
      var result = null;
      if (response.data !== "") {
        result = response.data; //JSON.parse(response.data);
      }
      console.log(result);
      setTimeout(() => {
        dispatch(loginSuccess({ data: result })); // Dispatching the loginSuccess action from the slice
      }, 2000);
      // dispatch(loginSuccess({ data: result })); // Dispatching the loginSuccess action from the slice
    } catch (error) {
      dispatch(loginFailure()); // Dispatching the loginFailure action from the slice
      console.log(error);
    }
  };
};
export const loginApi = (data) => {
  console.log("json-stringify", JSON.stringify(data));

  var config = {
    method: "post",
    url: SERVICE_URL + "/IvrLogin",
    headers: {
      "Content-Type": "application/json",
      //   Cookie: "ASP.NET_SessionId=zwxuhgcls5hnio5ued1p5jf5",
    },
    data: JSON.stringify(data),
  };

  return async (dispatch) => {
    dispatch(loginRequest()); // Dispatching the loginRequest action from the slice
    try {
      const response = await axios(config);
      var result = null;
      if (response.data !== "") {
        result = response.data; //JSON.parse(response.data);
      }
      console.log(result);
      setTimeout(() => {
        dispatch(loginSuccess({ data: result })); // Dispatching the loginSuccess action from the slice
      }, 2000);
      // dispatch(loginSuccess({ data: result })); // Dispatching the loginSuccess action from the slice
    } catch (error) {
      dispatch(loginFailure()); // Dispatching the loginFailure action from the slice
      console.log(error);
    }
  };
};

export const getMenu = () => {
  // let url = SHEET_SERVICE + GET_MENU_RANGE; //+ "&range=menu!A1:E20";
  //hide//console.log(url);

  let url =
    SHEET_SERVICE +
    "getGenericSheetJson?sheetid=1fM6UWNSCG_quUuTDE91GIC2l2qWNHiOZjUJDVWaO844&range=menu!A1:E20";
  //hide//console.log(url);
  return async (dispatch) => {
    dispatch(getMenuRequest());
    // dispatch(getMemberRequest());
    let data = null;
    await axios
      .get(url, { async: true })
      .then(function (response) {
        data = JSON.parse(response.data);
        data.shift();
        data = data.filter((item) => item.display === "show");
        // Sort the array by the "order" property
        data.sort((a, b) => parseInt(a.order) - parseInt(b.order));
        // { key: "1", label: <Link to="/">Home</Link> },
        // let menu =data.map((item)=>{
        //   { key: item.id, label : <Link to={item.link}>{item.text}</Link> }
        // })

        console.log("getMenu success", data);
        dispatch(getMenuSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" getMenu error : ", ex);
        dispatch(getMenuFailure());
      });
  };
};

export const logoutApi = () => {
  // localStorage.clear();
  const url = SERVICE_URL + "/IvrLogout";
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

export const getMember = (memb_code) => {
  console.log(`getMember ${memb_code}`);
  const url = `${SERVICE_URL}/SearchMember?mb_code=${memb_code}`; // Template literal for URL construction
  console.log(url);
  return async (dispatch) => {
    dispatch(getMemberRequest());
    // dispatch(getMenuRequest());
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

export const getNewLoan = (memb_code) => {
  console.log(`getNewLoan ${memb_code}`);
  const url = `${SERVICE_URL}/getNewLoan2024?mb_code=${memb_code}`; // Template literal for URL construction
  console.log(url);
  return async (dispatch) => {
    dispatch(newloanRequest());
    // dispatch(getMenuRequest());
    let data = null;
    await axios
      .get(url, { async: true })
      .then(function (response) {
        data = response.data;

        console.log("getMember success", data);
        dispatch(newloanSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" getMember error : ", ex);
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
        data = response.data;

        console.log("GetLoanRequests success", data);
        dispatch(getRequestListSuccess({ data: data }));
      })
      .catch(function (ex) {
        console.log(" GetLoanRequests error : ", ex);
        dispatch(getRequestListFailure());
      });
  };
};
