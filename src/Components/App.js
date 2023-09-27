import { useEffect, useState } from "react";
import styles from "../Styles/home.module.css";
import { connect } from "react-redux";
import { addTodo } from "../Redux/Actions";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";

export const Initialtodos = {
  unticked: [],
  ticked: [],
};

function App(props) {
  useEffect(() => {
    // const todos = JSON.parse(localStorage.getItem("todos"));
    if (JSON.parse(localStorage.getItem("todos"))) {
      props.dispatch(addTodo(JSON.parse(localStorage.getItem("todos"))));
    } else {
      props.dispatch(addTodo(Initialtodos));
      localStorage.setItem("todos",JSON.stringify(props.todos));
    }
    console.log(props.todos);
  }, []);
  return (
    <div className="App">
      <h1>Todo</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(App);
