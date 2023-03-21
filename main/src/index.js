import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Browser } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./css/index.css";
import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    //console.log(response.status);
    return response;
  },
  (error) => {
    console.log("error" + error);
    if (error.response.status === 404) {
      window.location.href("http://128.214.253.51:5000/");
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Browser>
    <App />
  </Browser>
);
