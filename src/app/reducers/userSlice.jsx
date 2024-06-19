// reducers/mainSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  const defaultState = {
    user: { isLoading: false, item: null, loginStatus: null },
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
//loadState() || loadState() || loadState() ||
const initialState = {
  user: { isLoading: false, item: null, loginStatus: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      // console.log(`loginRequest${state}`);
      state.user.isLoading = true;
      state.user.item = null;
      state.user.loginStatus = null;
      saveState(state); // Save state to localStorage
    },
    loginSuccess(state, action) {
      state.user.isLoading = false;
      state.user.item = action.payload.data;
      state.user.loginStatus = "success";
      saveState(state); // Save state to localStorage
    },
    loginFailure(state) {
      state.user.isLoading = false;
      state.user.loginStatus = "failure";
      saveState(state); // Save state to localStorage
    },
    logout(state) {
      // Clear user data when logging out
      state.user.isLoading = false;
      state.user.item = null;
      state.user.loginStatus = null;
      saveState(null);
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
