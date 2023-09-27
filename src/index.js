import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { createStore } from "redux";
import { todo } from "./Redux/Reducers";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

const store = createStore(todo);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
