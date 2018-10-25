import { takeLatest, put, call } from "redux-saga/effects";
import API from "../../api";
import { SAVE_USER_PROFILE } from "./constants";
import { setCurrentUser } from "../App/actions";
import { saveProfileSuccess, saveProfileFailure } from "./actions";

function* saveProfile({ user }) {
  try {
    const { user: updatedUser } = yield call(API.Auth.save, user);
    yield put(saveProfileSuccess());
    yield put(setCurrentUser({ user: updatedUser }));
  } catch (err) {
    yield put(saveProfileFailure({ errors: err.response.body.errors }));
  }
}

export default function* saveProfileSaga() {
  yield takeLatest(SAVE_USER_PROFILE, saveProfile);
}
