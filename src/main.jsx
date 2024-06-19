//main.jsx --samai-2024-03-14
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store/store.jsx";
import "./assets/styles/root.scss";
import Wizard from "./Wizard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your app in the Provider */}
    {/* The store we defined earlier */}
    <Provider store={store}>
      <App />
      {/* <Wizard /> */}
    </Provider>
  </React.StrictMode>
);
