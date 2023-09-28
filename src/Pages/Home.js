import React, { useState } from "react";

import CreateToDo from "../Components/CreateToDo";
import Todo from "../Components/Todo";
import styles from "../Styles/home.module.css";
import { connect } from "react-redux";

const Home = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [tickedMode, setTickedMode] = useState(false);
  const handleEdit = (edit) => {
    setEditMode(edit);
  };

  const handleTickedMode = () => {
    setTickedMode(!tickedMode);
  };
  return (
    <div className={styles.mainContainer}>
      <CreateToDo />
      {
        <ul className={styles.todolist}>
          {props.todos &&
            props.todos.unticked.map((todo) => {
              return (
                <li key={todo.id}>
                  <Todo
                    todo={todo}
                    handleEdit={handleEdit}
                    editModeOther={editMode}
                    setEditModeOther={setEditMode}
                    ticked={false}
                  />
                </li>
              );
            })}
        </ul>
      }
      {props.todos && props.todos.ticked.length>0 &&
        <h4 onClick={handleTickedMode} className={styles.tickedHeading}>
          <img
            src={
              tickedMode
                ? "https://img.icons8.com/ios-filled/50/collapse-arrow.png"
                : "https://img.icons8.com/ios-filled/50/expand-arrow--v1.png"
            }
          />
          Ticked Todos
        </h4>
      }
      {tickedMode && (
        <ul className={`${styles.todolist} ${styles.todoList_ticked}`}>
          {props.todos &&
            props.todos.ticked.map((todo) => {
              return (
                <li key={todo.id}>
                  <Todo
                    todo={todo}
                    handleEdit={handleEdit}
                    editModeOther={editMode}
                    setEditModeOther={setEditMode}
                    ticked={true}
                  />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(Home);
