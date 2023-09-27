import React, { useState } from 'react'

import CreateToDo from "../Components/CreateToDo";
import Todo from "../Components/Todo";
import styles from "../Styles/home.module.css"
import { connect } from 'react-redux';

const Home = (props) => {
    const [editMode, setEditMode] = useState(false);
    // const todos = JSON.parse(localStorage.getItem("todos"));
    const handleEdit = (edit) => {
      setEditMode(edit);
    };
    return (
      <div>
        <CreateToDo />
        {(
          <ul className={styles.todolist}>
            {props.todos&&props.todos.unticked.map((todo) => {
              return (
                <li key={todo.id}>
                  <Todo
                    data={todo}
                    handleEdit={handleEdit}
                    editModeOther={editMode}
                    setEditModeOther={setEditMode}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
}

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(Home)