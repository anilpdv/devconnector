import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import decoded from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/users/register", userData);
    history.push("/login");
  } catch (err) {
    const errors = err.response.data;
    dispatch(setErrors(errors));
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", userData);

    // taking the token
    const { token } = res.data;

    // storing it in localstorage
    localStorage.setItem("token", token);

    setAuthToken(token);

    // decoding the data
    const decode = decoded(token);

    // dispatching the current user
    dispatch(setCurrentUser(decode));
  } catch (err) {
    console.log(err.response.data);
    const errors = err.response.data;
    dispatch(setErrors(errors));
  }
};

export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  // setAuthtoken to false
  setAuthToken(false);
  // setCurrentuser to empty obejct
  dispatch(setCurrentUser({}));
};

export const setErrors = errors => {
  return {
    type: GET_ERRORS,
    payload: errors
  };
};

export const setErrorsEmpty = () => dispatch => {
  dispatch(setErrors({}));
};
