import { ADD_TODO, DELETE_TODO, TICK_TODO } from "../Actions";

const InitialState = {
  todos: {
    unticked: [],
    ticked: [],
  },
};

export function todo(state = InitialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: action.todos,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: action.todos,
      };
    case TICK_TODO:
      return {
        ...state,
        todos: action.todos,
      };
    default:
      break;
  }
}
