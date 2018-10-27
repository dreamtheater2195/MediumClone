import { call, put, takeLatest } from "redux-saga/effects";
import API from "../../api";
import { LOAD_PROFILE } from "./constants";
import { loadProfileSuccess, loadProfileError } from "./actions";

export function* loadProfile({ username }) {
  try {
    const { profile } = yield call(API.Profile.get, username);
    yield put(loadProfileSuccess({ profile }));
  } catch (err) {
    yield put(loadProfileError({ errors: err }));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_PROFILE, loadProfile);
}
