import {
    GET_TASKS,
    TASK_ERROR,
    DELETE_TASK,
    TASK_COMPLETE,
    ADD_TASK,
    GET_TASK,
    ADD_COMMENT,
    REMOVE_COMMENT
  } from '../actions/types';
  
  const initialState = {
    tasks: [],
    task: null,
    loading: true,
    error: {}
  };
  
  function taskReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_TASKS:
        return {
          ...state,
          tasks: payload,
          loading: false
        };
      case GET_TASK:
        return {
          ...state,
          task: payload,
          loading: false
        };
      case ADD_TASK:
        return {
          ...state,
          tasks: [payload, ...state.tasks],
          loading: false
        };
      case DELETE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter((task) => task._id !== payload),
          loading: false
        };
      case TASK_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case TASK_COMPLETE:
        return {
          ...state,
          task: !payload.isCompleted,
          loading: false
        };
      case ADD_COMMENT:
        return {
          ...state,
          task: { ...state.task, comments: payload },
          loading: false
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          task: {
            ...state.task,
            comments: state.task.comments.filter(
              (comment) => comment._id !== payload
            )
          },
          loading: false
        };
      default:
        return state;
    }
  }
  
  export default taskReducer;