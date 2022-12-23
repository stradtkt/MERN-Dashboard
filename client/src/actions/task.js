import axios from 'axios';
import { toast } from 'react-toastify';
import {
    GET_TASKS,
    TASK_ERROR,
    TASK_COMPLETE,
    DELETE_TASK,
    ADD_TASK,
    GET_TASK,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';


export const getTasks = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/tasks');
        dispatch({
            type: GET_TASKS,
            payload: res.data
        });
    } catch (error) {
        
    }
};
  
  export const deleteTask = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
  
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
  
      dispatch(toast.success('Task removed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }));
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  export const addTask = (formData) => async (dispatch) => {
    try {
      const res = await axios.post('/api/tasks', formData);
  
      dispatch({
        type: ADD_TASK,
        payload: res.data
      });
  
      dispatch(toast.success('Task Added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }));
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  

  export const getTask = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/tasks/${id}`);
  
      dispatch({
        type: GET_TASK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  export const addComment = (taskId, formData) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/tasks/comment/${taskId}`, formData);
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
  
      dispatch(toast.success('Comment Added'));
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  export const deleteComment = (taskId, commentId) => async (dispatch) => {
    try {
      await axios.delete(`/api/tasks/comment/${taskId}/${commentId}`);
  
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
  
      dispatch(toast.success('Comment Deleted'));
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  export const taskCompleted = (taskId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/tasks/${taskId}/completed`);
        dispatch({
            type: TASK_COMPLETE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TASK_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
  };