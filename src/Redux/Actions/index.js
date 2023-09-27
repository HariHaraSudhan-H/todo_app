export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TICK_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";

export const addTodo = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos));
    return {
      type: ADD_TODO,
      todos,
    };
};

export const deleteTodo = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos));
    return {
      type: DELETE_TODO,
      todos,
    };
};

export const tickTodo = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos));
    return {
      type: TICK_TODO,
      todos,
    };
};