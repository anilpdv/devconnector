import { GET_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/users/register", userData);
    history.push("/login");
    console.log(res.status);
  } catch (err) {
    const errors = err.response.data;
    dispatch({ type: GET_ERRORS, payload: errors });
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
  } catch (err) {
    const errors = err.response.data;
    dispatch({ type: GET_ERRORS, payload: errors });
  }
};
