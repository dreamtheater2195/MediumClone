import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  UPDATE_AUTH_FIELD,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
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

export function loginUser({ email, password }) {
  return {
    type: LOGIN_USER,
    email,
    password,
  };
}

export function loginUserSuccess({ user }) {
  return {
    type: LOGIN_USER_SUCCESS,
    user,
  };
}

export function loginUserFailure({ errors }) {
  return {
    type: LOGIN_USER_FAILURE,
    errors,
  };
}
