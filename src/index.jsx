import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./style.scss"
import NavBar from "./component/NavBar";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>

    <App /> 
    </Provider>
  </React.StrictMode>
);