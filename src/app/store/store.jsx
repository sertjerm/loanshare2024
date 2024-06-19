//store.jsx
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers/mainSlice";
import userReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: { main: mainReducer, user: userReducer },
});

export default store;
