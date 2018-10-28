import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import API from "../../api";
import { LOAD_PROFILE, FOLLOW_USER, UNFOLLOW_USER } from "./constants";
import { loadProfileSuccess, loadProfileError } from "./actions";

export function* loadProfile({ username }) {
  try {
    const { profile } = yield call(API.Profile.get, username);
    yield put(loadProfileSuccess({ profile }));
  } catch (err) {
    yield put(loadProfileError({ errors: err }));
  }
}

export function* loadProfileSaga() {
  yield takeLatest(LOAD_PROFILE, loadProfile);
}

export function* followUser({ username }) {
  yield call(API.Profile.follow, username);
}

export function* followUserSaga() {
  yield takeLatest(FOLLOW_USER, followUser);
}

export function* unfollowUser({ username }) {
  yield call(API.Profile.follow, username);
}

export function* unfollowUserSaga() {
  yield takeLatest(UNFOLLOW_USER, unfollowUser);
}

export default function* profileRootSaga() {
  yield all([
    fork(followUserSaga),
    fork(unfollowUserSaga),
    fork(loadProfileSaga),
  ]);
}
