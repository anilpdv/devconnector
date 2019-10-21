import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";
import axios from "axios";

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading);
  return axios
    .get("/api/profile")
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: {} });
    });
};

export const getProfileByHandle = handle => async dispatch => {
  dispatch(setProfileLoading);
  return axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: null });
    });
};

export const createProfile = (profileData, history) => async dispatch => {
  return axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteProfile = () => dispatch => {
  // if (window.confirm("Are you sure? This is cannot be undone")) {
  return axios
    .delete("/api/profile")
    .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
  //  }
};

export const addEducation = (eduData, history) => dispatch => {
  return axios
    .post("/api/profile/education", eduData)
    .then(() => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const addExperience = (expData, history) => dispatch => {
  return axios
    .post("/api/profile/experience", expData)
    .then(() => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const deleteExperience = id => dispatch => {
  return axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const deleteEducation = id => dispatch => {
  return axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const getProfiles = () => dispatch => {
  return axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({ type: GET_PROFILES, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
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
