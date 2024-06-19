// reducers/mainSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

// // Load initial state from localStorage
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("reduxState");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.log("Error loading state from localStorage:", error);
//     return undefined;
//   }
// };
// // // Load initial state from localStorage
// // const loadState = () => {
// //   try {
// //     const serializedState = localStorage.getItem("reduxState");
// //     if (serializedState === null) {
// //       return undefined;
// //     }
// //     const parsedState = JSON.parse(serializedState);
// //     return { ...initialState, ...parsedState };
// //   } catch (error) {
// //     console.log("Error loading state from localStorage:", error);
// //     return undefined;
// //   }
// // };
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("reduxState");
//     if (serializedState === null) {
//       return initialState;
//     }
//     return { ...initialState, ...JSON.parse(serializedState) };
//   } catch (error) {
//     console.log("Error loading state from localStorage:", error);
//     return initialState;
//   }
// };
const loadState = () => {
  const defaultState = {
    user: { isLoading: false, item: null },
    menu: { isLoading: false, items: null },
    requestList: { isLoading: false, items: null },
  };

  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return defaultState;
    }
    return { ...defaultState, ...JSON.parse(serializedState) };
  } catch (error) {
    console.log("Error loading state from localStorage:", error);
    return defaultState;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.log("Error saving state to localStorage:", error);
  }
};
//loadState() || loadState() ||
const initialState = {
  member: { isLoading: false, item: null },
  user: { isLoading: false, item: null },
  menu: { isLoading: false, items: null },
  exist: { isLoading: false, items: null },
  requestList: { isLoading: false, items: null },
  newloan: { isLoading: false, item: null },
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getMemberRequest(state) {
      console.log(`getMemberRequest${state}`);
      state.member.isLoading = true;
      state.member.item = null;
      saveState(state); // Save state to localStorage
    },
    getMemberSuccess(state, action) {
      console.log(`getMemberSuccess${state},${action}`);
      state.member.isLoading = false;
      state.member.item = action.payload.data;
      saveState(state); // Save state to localStorage
    },
    getMemberFailure(state) {
      state.member.isLoading = false;
      saveState(state); // Save state to localStorage
    },
    getMenuRequest(state) {
      console.log(`getMenuRequest${state}`);
      state.menu.isLoading = true;
      state.menu.items = null;
      saveState(state); // Save state to localStorage
    },
    getMenuSuccess(state, action) {
      state.menu.isLoading = false;
      state.menu.items = action.payload.data;
      saveState(state); // Save state to localStorage
    },
    getMenuFailure(state) {
      state.menu.isLoading = false;
      saveState(state); // Save state to localStorage
    },
    getRequestListRequest(state) {
      console.log(`getRequestListRequest${state}`);
      state.requestList.isLoading = true;
      state.requestList.items = null;
      saveState(state); // Save state to localStorage
    },
    getRequestListSuccess(state, action) {
      state.requestList.isLoading = false;
      state.requestList.items = action.payload.data;
      saveState(state); // Save state to localStorage
    },
    getRequestListFailure(state) {
      state.requestList.isLoading = false;
      saveState(state); // Save state to localStorage
    },
    loginRequest(state) {
      console.log(`loginRequest${state}`);
      state.user.isLoading = true;
      state.user.item = null;
      saveState(state); // Save state to localStorage
    },
    loginSuccess(state, action) {
      state.user.isLoading = false;
      state.user.item = action.payload.data;
      saveState(state); // Save state to localStorage
    },
    loginFailure(state) {
      state.user.isLoading = false;
      saveState(state); // Save state to localStorage
    },
    logout(state) {
      // Clear user data when logging out
      state.user.isLoading = false;
      state.user.item = null;
      saveState(null);
    },
    newloanRequest(state) {
      console.log(`newloanRequest${state}`);
      state.newloan.isLoading = true;
      state.newloan.item = null;
      saveState(state); // Save state to localStorage
    },
    newloanSuccess(state, action) {
      state.newloan.isLoading = false;
      state.newloan.item = action.payload.data;
      saveState(state); // Save state to localStorage
    },
    newloanFailure(state) {
      state.newloan.isLoading = false;
      saveState(state); // Save state to localStorage
    },
  },
});

export const {
  getMenuRequest,
  getMenuSuccess,
  getMenuFailure,
  getMemberRequest,
  getMemberSuccess,
  getMemberFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  newloanRequest,
  newloanSuccess,
  newloanFailure,
  getRequestListRequest,
  getRequestListSuccess,
  getRequestListFailure,
} = mainSlice.actions;

export default mainSlice.reducer;
