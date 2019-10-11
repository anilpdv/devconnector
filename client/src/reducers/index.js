import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import profile from "./profile";

export default combineReducers({
  auth: auth,
  errors: errors,
  profile: profile
});
