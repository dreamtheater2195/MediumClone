/**
 * Get article lists
 */
import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import API from "../../api";
import { LOAD_GLOBAL_ARTICLES, LOAD_POPULAR_TAGS } from "./constants";
import {
  loadGlobalArticlesSuccess,
  loadGlobalArticlesFailure,
  loadTagsSuccess,
} from "./actions";

export function* loadGlobalFeed(page) {
  try {
    const { articles, articlesCount } = yield call(API.Article.all, page);
    yield put(loadGlobalArticlesSuccess(articles, articlesCount));
  } catch (err) {
    yield put(loadGlobalArticlesFailure(err));
  }
}

export function* loadTags() {
  const { tags } = yield call(API.Tag.getAll);
  yield put(loadTagsSuccess(tags));
}

export function* loadGlobalFeedSaga() {
  yield takeLatest(LOAD_GLOBAL_ARTICLES, loadGlobalFeed);
}

export function* loadTagsSaga() {
  yield takeLatest(LOAD_POPULAR_TAGS, loadTags);
}

export default function* articlesSaga() {
  yield all([fork(loadGlobalFeedSaga), fork(loadTagsSaga)]);
}
