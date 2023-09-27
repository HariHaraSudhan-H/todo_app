import React, { useState } from 'react';
import styles from '../Styles/home.module.css'
import { Initialtodos } from './App';
import { connect } from 'react-redux';
import { addTodo } from '../Redux/Actions';

const CreateToDo = (props) => {
    const [toDo,setTodo] = useState('');
    // const todos = JSON.parse(localStorage.getItem("todos"));
    const {todos} = props;
    const handleSubmit = (e)=>{
      e.preventDefault();
      const newTodo = {
        completed : false,
        userId : 1,
        title : toDo,
        id : todos?(todos.unticked.length+todos.ticked.length+1):1
      };
      const newUnticked = [newTodo,...todos.unticked];
      const newTodos = {
        unticked: newUnticked,
        ticked: todos.ticked
      }
      console.log(newTodos);
      localStorage.setItem("todos",JSON.stringify(newTodos));
      props.dispatch(addTodo(newTodos));
    }

    const handleRemove = (e)=>{
      e.preventDefault();
      const newTodos = {
        ticked: [],
        ...props.todos
      };
      props.dispatch(addTodo(newTodos));
    }

    const handleReset = (e)=>{
      e.preventDefault();
      props.dispatch(addTodo(Initialtodos));
    }

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
          Add Post
        </button>
        <button className={styles.createtodoButton} style={{backgroundColor:'red'}} onClick={handleRemove}>Remove Ticked</button>
        <button onClick={handleReset}><img src="https://img.icons8.com/ios-filled/50/recurring-appointment.png"/></button>
      </form>
    </div>
  )
}

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(CreateToDo)