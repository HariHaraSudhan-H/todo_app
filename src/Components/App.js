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
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", JSON.stringify(Initialtodos));
    }
    props.dispatch(addTodo(JSON.parse(localStorage.getItem("todos"))));
  }, []);

  const handleReset = (e)=>{
    e.preventDefault();
    props.dispatch(addTodo(Initialtodos));
  }

  return (
    <div className="App">
      <h1 className={styles.navBrand}>
        <img src="https://img.icons8.com/ios-filled/50/FA5252/reminders.png" />
        To Do
      </h1>
      <button
        className={`${styles.resetButton} ${styles.createtodoButton}`}
        onClick={handleReset}
      >
        <img src="https://img.icons8.com/ios-filled/50/recurring-appointment.png" />
      </button>
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
