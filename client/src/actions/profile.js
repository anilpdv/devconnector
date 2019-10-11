import { PROFILE_LOADING } from "./types";
import axios from "axios";

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
