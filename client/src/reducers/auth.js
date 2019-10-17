import {
  TEST_DISPATCH,
  SET_CURRENT_USER,
  SET_LOGGEDIN_FALSE
} from "../actions/types";
import { isEmpty } from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: null,
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_LOGGEDIN_FALSE:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
}
