import { TEST_DISPATCH } from "./types";
import { GET_ERRORS } from "./types";
import axios from "axios";

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
