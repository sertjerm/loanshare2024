//main.jsx --samai-2024-03-14
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store/store.jsx";
import "./assets/styles/root.scss";
import { Route, Router, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin.jsx";
import AppAdmin from "./AppAdmin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your app in the Provider */}
    {/* The store we defined earlier */}
    <Provider store={store}>
      {/* <App /> */}
      <AppAdmin />
    </Provider>
  </React.StrictMode>
);
