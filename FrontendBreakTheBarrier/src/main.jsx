import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import 'regenerator-runtime/runtime'
import { BrowserRouter } from "react-router-dom";
import "./assets/css/global.scss";
import "./assets/css/root.scss";
import "./assets/css/utils.scss";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
