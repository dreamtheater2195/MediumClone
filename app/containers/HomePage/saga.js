/**
 * Get article lists
 */
import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import API from "../../api";
import { LOAD_GLOBAL_ARTICLES } from "./constants";
import {
  loadGlobalArticlesSuccess,
  loadGlobalArticlesFailure,
} from "./actions";

export function* loadGlobalFeed(page) {
  try {
    const { articles, articlesCount } = yield call(API.Article.all, page);
    yield put(loadGlobalArticlesSuccess(articles, articlesCount));
  } catch (err) {
    yield put(loadGlobalArticlesFailure(err));
  }
}

export function* loadGlobalFeedSaga() {
  yield takeLatest(LOAD_GLOBAL_ARTICLES, loadGlobalFeed);
}

export default function* articlesSaga() {
  yield all([fork(loadGlobalFeedSaga)]);
}
