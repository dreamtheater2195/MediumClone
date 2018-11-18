import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  UPDATE_AUTH_FIELD,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  SET_APP_LOADED,
  LIKE_ARTICLE,
  UNLIKE_ARTICLE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "./constants";

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER,
  };
}

export function setCurrentUser({ user }) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
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

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function setAppLoaded(loaded) {
  return {
    type: SET_APP_LOADED,
    loaded,
  };
}

export function likeArticle(slug) {
  return {
    type: LIKE_ARTICLE,
    slug,
  };
}

export function unlikeArticle(slug) {
  return {
    type: UNLIKE_ARTICLE,
    slug,
  };
}

export function followUser({ username }) {
  return {
    type: FOLLOW_USER,
    username,
  };
}

export function unfollowUser({ username }) {
  return {
    type: UNFOLLOW_USER,
    username,
  };
}
