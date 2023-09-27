import React, { useState } from "react";
import styles from "../Styles/home.module.css"
import { connect } from "react-redux";
import { deleteTodo } from "../Redux/Actions";

const Todo = (props) => {
  const { data, editModeOther, setEditModeOther } = props;
  const [title, setTitle] = useState(data.title);
  const [completed, setCompleted] = useState(data.completed);
  const [editMode, setEditMode] = useState(false);
  const {todos,dispatch} = props;
  // handles deletion of todo's
  const handleDelete = (id) => {
    const newUnticked = todos.unticked.filter((todo)=>todo.id!=id);
    const newTodos = {
      unticked:newUnticked,
      ...todos
    }
    localStorage.setItem("todos",JSON.stringify(newTodos));
    dispatch(deleteTodo(newTodos));
  };

  // Handles edit icon click and makes edit mode on
  const handleEditClick = () => {
    setEditMode(true);
    setEditModeOther(true);
  };
  const handleCompleteClick = (id) => {};

  // Handles saving the changes after edit and makes editmode false
  const handleEditSave = (e, id) => {};

  // styles to make strikethrough for todos those are done
  const style = {
    todoTitle: {
      textDecoration: completed ? "line-through black 3px" : "none",
    },
  };

  return (
    <div className={styles.todo}>
      {
        <>
          <span style={style.todoTitle}>{title}</span>
          <div className={styles.btngroup}>
            <button className={styles.button}>
              <img
                src="https://cdn.icon-icons.com/icons2/1367/PNG/512/32officeicons-3_89720.png"
                alt="delete"
                className={styles.buttonimages}
                onClick={() => {
                  handleDelete(data.id);
                }}
              />
            </button>
            <button
              className={styles.button}
              disabled={editModeOther}
              onClick={handleEditClick}
            >
              <img
                src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png"
                alt="edit"
                className={styles.buttonimages}
              />
            </button>
            {completed ? (
              <button className={styles.button}>
                <img
                  src="https://cdn.icon-icons.com/icons2/1184/PNG/512/1490134498-checkmark_82222.png"
                  alt="removeComplete"
                  className={styles.buttonimages}
                  onClick={() => {
                    handleCompleteClick(data.id);
                  }}
                />
              </button>
            ) : (
              <button className={styles.button}>
                <img
                  src="https://cdn.icon-icons.com/icons2/10/PNG/256/check_ok_accept_apply_1582.png"
                  className={styles.buttonimages}
                  alt="makeComplete"
                  onClick={() => {
                    handleCompleteClick(data.id);
                  }}
                />
              </button>
            )}
          </div>
        </>
      }
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(Todo);
