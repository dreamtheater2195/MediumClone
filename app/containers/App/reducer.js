import { fromJS } from "immutable";

import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  UPDATE_AUTH_FIELD,
} from "./constants";

// The initial state of the App
const initialState = fromJS({
  token: localStorage.getItem("jwt"),
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
      return state
        .setIn(["auth", "loading"], true)
        .setIn(["auth", "errors"], null);
    case REGISTER_USER_SUCCESS:
      return state
        .set("token", action.user.token)
        .set("currentUser", action.user)
        .setIn(["auth", "loading"], false)
        .setIn(["auth", "errors"], null);
    case REGISTER_USER_FAILURE:
      return state
        .setIn(["auth", "loading"], false)
        .setIn(["auth", "errors"], action.errors);
    default:
      return state;
  }
}

export default appReducer;
