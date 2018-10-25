import { takeLatest, take, put, call, all, fork } from "redux-saga/effects";
import API from "../../api";
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_CURRENT_USER,
  LOGOUT_USER,
} from "./constants";
import {
  registerUserSuccess,
  registerUserFailure,
  loginUserSuccess,
  loginUserFailure,
  setCurrentUser,
  setAppLoaded,
} from "./actions";

function setAuthToken(token) {
  localStorage.setItem("jwt", token);
  API.setToken(token);
}

function removeAuthToken() {
  localStorage.removeItem("jwt");
  API.setToken(null);
}

function* signin({ email, password }) {
  try {
    const { user } = yield call(API.Auth.login, email, password);
    yield call(setAuthToken, user.token);
    yield put(loginUserSuccess({ user }));
  } catch (err) {
    yield call(signout);
    yield put(loginUserFailure({ errors: err.response.body.errors }));
  }
}

function* signout() {
  yield call(removeAuthToken);
}

function* signup({ username, email, password }) {
  try {
    const { user } = yield call(API.Auth.register, username, email, password);
    yield call(setAuthToken, user.token);
    yield put(registerUserSuccess({ user }));
  } catch (err) {
    yield call(signout);
    yield put(registerUserFailure({ errors: err.response.body.errors }));
  }
}

export function* userSigninSaga() {
  yield takeLatest(LOGIN_USER, signin);
}

export function* userSignupSaga() {
  yield takeLatest(REGISTER_USER, signup);
}

export function* userSignoutSaga() {
  yield takeLatest(LOGOUT_USER, signout);
}

export function* currentUserSaga() {
  yield take(GET_CURRENT_USER);
  try {
    const user = yield call(API.Auth.current);
    yield put(setCurrentUser(user));
  } catch (err) {
    console.log("Cannot get current user info", err);
  }
  yield put(setAppLoaded(true));
}

export default function* rootSaga() {
  yield all([
    fork(userSignupSaga),
    fork(userSigninSaga),
    fork(currentUserSaga),
    fork(userSignoutSaga),
  ]);
}
