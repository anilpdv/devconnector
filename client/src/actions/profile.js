import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";
import axios from "axios";

export const getCurrentProfile = () => async dispatch => {
  try {
    console.log("getCurrentProfile is called and successful");
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log("getCurrentProfile is called and not successful");
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
