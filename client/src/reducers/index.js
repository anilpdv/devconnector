import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";

export default combineReducers({
  auth: auth,
  errors: errors
});
