import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";
import axios from "axios";

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading);
    const res = await axios.get("/api/profile");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
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
