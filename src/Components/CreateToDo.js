import React, { useState } from "react";
import styles from "../Styles/home.module.css";
import { Initialtodos } from "./App";
import { connect } from "react-redux";
import { addTodo } from "../Redux/Actions";

const CreateToDo = (props) => {
  const [toDo, setTodo] = useState("");
  const { todos } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (toDo!="") {
      const newTodo = {
        completed: false,
        userId: 1,
        title: toDo,
        id: todos ? todos.unticked.length + todos.ticked.length + 1 : 1,
      };
      const newUnticked = [newTodo, ...todos.unticked];
      const newTodos = {
        unticked: newUnticked,
        ticked: todos.ticked,
      };
      localStorage.setItem("todos", JSON.stringify(newTodos));
      props.dispatch(addTodo(newTodos));
      setTodo("");
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const newTodos = {
      ticked: [],
      unticked: props.todos.unticked,
    };
    console.log(newTodos);
    props.dispatch(addTodo(newTodos));
  };

  return (
    <div>
      <form className={styles.createtodo} onSubmit={handleSubmit}>
        <input
          type="text"
          value={toDo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          className={styles.createtodoInput}
          placeholder="Enter the task..."
        />
        <button type="submit" className={styles.createtodoButton}>
          Add
        </button>
        <button
          className={styles.createtodoButton}
          style={{ backgroundColor: "red" }}
          onClick={handleRemove}
        >
          Delete Ticked
        </button>
      </form>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(CreateToDo);
