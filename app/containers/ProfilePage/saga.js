import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import API from "../../api";
import {
  LOAD_PROFILE,
  LOAD_ARTICLES,
  LOAD_ARTICLES_FAILURE,
  LOAD_ARTICLES_SUCCESS,
} from "./constants";
import { loadProfileSuccess, loadProfileError } from "./actions";

export function* loadProfile({ username }) {
  try {
    const { profile } = yield call(API.Profile.get, username);
    yield put(loadProfileSuccess({ profile }));
  } catch (err) {
    yield put(loadProfileError({ errors: err }));
  }
}

export function* loadArticles(action) {
  try {
    if (action.tab === "author") {
      const { articles, articlesCount } = yield call(
        API.Article.byAuthor,
        action.author,
        action.page,
      );
      yield put({ type: LOAD_ARTICLES_SUCCESS, articles, articlesCount });
    } else if (action.tab === "favorite") {
      const { articles, articlesCount } = yield call(
        API.Article.favoritedBy,
        action.author,
        action.page,
      );
      yield put({ type: LOAD_ARTICLES_SUCCESS, articles, articlesCount });
    }
  } catch (err) {
    yield put({ type: LOAD_ARTICLES_FAILURE, error: err });
  }
}

export function* loadProfileSaga() {
  yield takeLatest(LOAD_PROFILE, loadProfile);
}

export function* loadArticlesSaga() {
  yield takeLatest(LOAD_ARTICLES, loadArticles);
}

export default function* profileRootSaga() {
  yield all([fork(loadProfileSaga), fork(loadArticlesSaga)]);
}
