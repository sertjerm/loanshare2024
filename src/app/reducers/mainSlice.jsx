// reducers/mainSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

// // // Load initial state from localStorage
// // const loadState = () => {
// //   try {
// //     const serializedState = localStorage.getItem("reduxState");
// //     if (serializedState === null) {
// //       return undefined;
// //     }
// //     return JSON.parse(serializedState);
// //   } catch (error) {
// //     console.log("Error loading state from localStorage:", error);
// //     return undefined;
// //   }
// // };
// // // // Load initial state from localStorage
// // // const loadState = () => {
// // //   try {
// // //     const serializedState = localStorage.getItem("reduxState");
// // //     if (serializedState === null) {
// // //       return undefined;
// // //     }
// // //     const parsedState = JSON.parse(serializedState);
// // //     return { ...initialState, ...parsedState };
// // //   } catch (error) {
// // //     console.log("Error loading state from localStorage:", error);
// // //     return undefined;
// // //   }
// // // };
// // const loadState = () => {
// //   try {
// //     const serializedState = localStorage.getItem("reduxState");
// //     if (serializedState === null) {
// //       return initialState;
// //     }
// //     return { ...initialState, ...JSON.parse(serializedState) };
// //   } catch (error) {
// //     console.log("Error loading state from localStorage:", error);
// //     return initialState;
// //   }
// // };
// const loadState = () => {
//   const defaultState = {
//     member: { isLoading: false, item: null },
//     menu: { isLoading: false, items: null },
//     exist: { isLoading: false, items: null },
//     requestList: { isLoading: false, items: null },
//     newloan: { isLoading: false, item: null },
//     loanRequst:{isLoading:false,item:null},
//   };

//   try {
//     const serializedState = localStorage.getItem("reduxState");
//     if (serializedState === null) {
//       return defaultState;
//     }
//     return { ...defaultState, ...JSON.parse(serializedState) };
//   } catch (error) {
//     console.log("Error loading state from localStorage:", error);
//     return defaultState;
//   }
// };

// // Save state to localStorage
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("reduxState", serializedState);
//   } catch (error) {
//     console.log("Error saving state to localStorage:", error);
//   }
// };
//loadState() || loadState() ||
const initialState = {
  member: { isLoading: false, item: null },
  menu: { isLoading: false, items: null },
  exist: { isLoading: false, items: null },
  requestList: { isLoading: false, items: null },
  newloan: { isLoading: false, item: null },
  savedloan:{isLoading:false,item:null},
  batchList: {isLoading:false,items:null},
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    getMemberRequest(state) {
      console.log(`getMemberRequest${state}`);
      state.member.isLoading = true;
      state.member.item = null;
      //saveState(state); // Save state to localStorage
    },
    getMemberSuccess(state, action) {
      console.log(`getMemberSuccess${state},${action}`);
      state.member.isLoading = false;
      state.member.item = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    getMemberFailure(state) {
      state.member.isLoading = false;
      //saveState(state); // Save state to localStorage
    },
    getMenuRequest(state) {
      console.log(`getMenuRequest${state}`);
      state.menu.isLoading = true;
      state.menu.items = null;
      //saveState(state); // Save state to localStorage
    },
    getMenuSuccess(state, action) {
      state.menu.isLoading = false;
      state.menu.items = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    getMenuFailure(state) {
      state.menu.isLoading = false;
      //saveState(state); // Save state to localStorage
    },
    getRequestListRequest(state) {
      console.log(`getRequestListRequest${state}`);
      state.requestList.isLoading = true;
      state.requestList.items = null;
      //saveState(state); // Save state to localStorage
    },
    getRequestListSuccess(state, action) {
      state.requestList.isLoading = false;
      state.requestList.items = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    getRequestListFailure(state) {
      state.requestList.isLoading = false;
      //saveState(state); // Save state to localStorage
    },

    newloanRequest(state) {
      console.log("newloanRequest", state);
      state.newloan.isLoading = true;
      state.newloan.item = null;
      //saveState(state); // Save state to localStorage
    },
    newloanSuccess(state, action) {
      console.log("newloanSuccess action ,state=", action, state);
      state.newloan.isLoading = false;
      state.newloan.item = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    newloanFailure(state) {
      state.newloan.isLoading = false;
      //saveState(state); // Save state to localStorage
    },
    savedloanRequest(state) {
      console.log("savedloanRequest", state);
      state.savedloan.isLoading = true;
      state.savedloan.item = null;
      //saveState(state); // Save state to localStorage
    },
    savedloanSuccess(state, action) {
      console.log("savedloanSuccess action ,state=", action, state);
      state.savedloan.isLoading = false;
      state.savedloan.item = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    savedloanFailure(state) {
      state.savedloan.isLoading = false;
      //saveState(state); // Save state to localStorage
    },
    // updateloanRequest(state) {
    //   console.log("updateloanRequest", state);
    //   state.updateloan.isLoading = true;
    //   state.updateloan.item = null;
    //   //saveState(state); // Save state to localStorage
    // },
    // updateloanSuccess(state, action) {
    //   console.log("updateloanSuccess action ,state=", action, state);
    //   state.updateloan.isLoading = false;
    //   state.updateloan.item = action.payload.data;
    //   //saveState(state); // Save state to localStorage
    // },
    // updateloanFailure(state) {
    //   state.updateloan.isLoading = false;
    //   //saveState(state); // Save state to localStorage
    // },
    newloanUpdate(state, action) {
      console.log("newloanUpdate action ,state=", action, state);
      state.newloan.isLoading = false;
      state.newloan.item = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    getBatchListRequest(state) {
      console.log(`batchListRequest${state}`);
      state.batchList.isLoading = true;
      state.batchList.items = null;
      //saveState(state); // Save state to localStorage
    },
    getBatchListSuccess(state, action) {
      state.batchList.isLoading = false;
      state.batchList.items = action.payload.data;
      //saveState(state); // Save state to localStorage
    },
    getBatchListFailure(state) {
      state.batchList.isLoading = false;
      //saveState(state); // Save state to localStorage
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

  getRequestListRequest,
  getRequestListSuccess,
  getRequestListFailure,

  newloanRequest,
  newloanSuccess,
  newloanFailure,

  savedloanRequest,
  savedloanSuccess,
  savedloanFailure,

  getBatchListRequest,
  getBatchListSuccess,
  getBatchListFailure,

  newloanUpdate,
} = mainSlice.actions;

export default mainSlice.reducer;
