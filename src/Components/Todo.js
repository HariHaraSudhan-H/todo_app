import React, { useState } from "react";
import styles from "../Styles/home.module.css";
import { connect } from "react-redux";
import { addTodo, deleteTodo, tickTodo } from "../Redux/Actions";

const Todo = (props) => {
  const { todos, dispatch} = props;
  const { todo ,editModeOther, setEditModeOther } = props;
  const [title, setTitle] = useState(todo.title);
  const [editMode, setEditMode] = useState(false);
  // handles deletion of todo's
  const handleDelete = (id) => {
    const newUnticked = todos.unticked.filter((todo) => todo.id != id);
    const newTodos = {
      unticked: newUnticked,
      ticked: todos.ticked,
    };
    console.log(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    dispatch(deleteTodo(newTodos));
  };

  // Handles edit icon click and makes edit mode on
  const handleEditClick = () => {
    setEditMode(true);
    setEditModeOther(true);
  };
  const handleCompleteClick = (id, ticked) => {
    const completedTodo = ticked
      ? todos.ticked.filter((todo) => todo.id === id)[0]
      : todos.unticked.filter((todo) => todo.id === id)[0];
    completedTodo.completed = !completedTodo.completed;

    const newTodos = ticked
      ? {
          ticked: todos.ticked.filter((todo) => todo.id !== id),
          unticked: [completedTodo,...todos.unticked],
        }
      : {
          unticked: todos.unticked.filter((todo) => todo.id !== id),
          ticked: [...todos.ticked, completedTodo],
        };
    localStorage.setItem("todos", JSON.stringify(newTodos));
    dispatch(tickTodo(newTodos));
  };

  // Handles saving the changes after edit and makes editmode false
  const handleEditSave = (e, id) => {
    e.preventDefault();
    const newTodos = todos;
    console.log(newTodos)
    newTodos.unticked.map((todo)=>{
      if(todo.id===id){
        todo.title = title;
        return;
      }
    })
    dispatch(addTodo(newTodos));
    localStorage.setItem("todos",JSON.stringify(newTodos));
    setEditMode(false);
    setEditModeOther(false);
  };

  // styles to make strikethrough for todos those are done
  const style = {
    todoTitle: {
      textDecoration: todo.completed ? "line-through black 3px" : "none",
    },
  };

  return (
    <div className={styles.todo}>
      { editMode ? (
        <form
          onSubmit={(e) => {
            handleEditSave(e, todo.id);
          }}
          className={styles.editTodo}
        >
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={styles.editInput}
          />
          <button className={styles.button} style={{backgroundColor:'green',borderRadius:'20px'}}>Save</button>
        </form>
      ) : (
        <>
          <span style={style.todoTitle}>{todo.title}</span>
          <div className={styles.btngroup}>
            <button className={styles.button}>
              <img
                src="https://cdn.icon-icons.com/icons2/1367/PNG/512/32officeicons-3_89720.png"
                alt="delete"
                className={styles.buttonimages}
                onClick={() => {
                  handleDelete(todo.id);
                }}
              />
            </button>
            {!props.ticked&&<button
              className={styles.button}
              disabled={editModeOther}
              onClick={handleEditClick}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/FA5252/create-new.png"
                alt="edit"
                className={styles.buttonimages}
              />
            </button>}
            {todo.completed ? (
              <button className={styles.button}>
                <img
                  src="https://img.icons8.com/ios-filled/50/FA5252/checkmark--v1.png"
                  alt="removeComplete"
                  className={styles.buttonimages}
                  onClick={() => {
                    handleCompleteClick(todo.id, props.ticked);
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
                    handleCompleteClick(todo.id);
                  }}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(Todo);
