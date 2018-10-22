import { fromJS } from "immutable";

import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  UPDATE_AUTH_FIELD,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SET_CURRENT_USER,
} from "./constants";

// The initial state of the App
const initialState = fromJS({
  token: null,
  currentUser: null,
  auth: {
    loading: false,
    errors: null,
    username: "",
    email: "",
    password: "",
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTH_FIELD:
      return state.setIn(["auth", `${action.field}`], action.value);
    case REGISTER_USER:
    case LOGIN_USER:
      return state
        .setIn(["auth", "loading"], true)
        .setIn(["auth", "errors"], null);
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return state
        .set("token", action.user.token)
        .set("currentUser", action.user)
        .setIn(["auth", "loading"], false)
        .setIn(["auth", "errors"], null);
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
      return state
        .setIn(["auth", "loading"], false)
        .setIn(["auth", "errors"], action.errors);
    case SET_CURRENT_USER:
      return state
        .set("token", action.user.token)
        .set("currentUser", action.user);
    default:
      return state;
  }
}

export default appReducer;
