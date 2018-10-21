import {
  takeLatest,
  take,
  put,
  call,
  cancel,
  all,
  fork,
} from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import API from "../../api";
import { REGISTER_USER } from "./constants";
import { registerUserSuccess, registerUserFailure } from "./actions";

function* signup({ username, email, password }) {
  try {
    const { user } = yield call(API.Auth.register, username, email, password);
    yield localStorage.setItem("jwt", user.token);
    API.setToken(user.token);
    yield put(registerUserSuccess({ user }));
  } catch (err) {
    yield put(registerUserFailure({ errors: err.response.body.errors }));
  }
}

export function* userSignup() {
  const watcher = yield takeLatest(REGISTER_USER, signup);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default function* rootSaga() {
  yield all([fork(userSignup)]);
}
