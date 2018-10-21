import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  UPDATE_AUTH_FIELD,
} from "./constants";

export function changeAuthField({ field, value }) {
  return {
    type: UPDATE_AUTH_FIELD,
    field,
    value,
  };
}
export function registerUser({ username, email, password }) {
  return {
    type: REGISTER_USER,
    username,
    email,
    password,
  };
}

export function registerUserSuccess({ user }) {
  return {
    type: REGISTER_USER_SUCCESS,
    user,
  };
}

export function registerUserFailure({ errors }) {
  return {
    type: REGISTER_USER_FAILURE,
    errors,
  };
}
