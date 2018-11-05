/**
 * Get article lists
 */
import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import API from "../../api";
import {
  LOAD_ARTICLES,
  LOAD_POPULAR_TAGS,
  LIKE_ARTICLE,
  UNLIKE_ARTICLE,
} from "./constants";
import {
  loadArticlesSuccess,
  loadArticlesFailure,
  loadTagsSuccess,
} from "./actions";

export function* loadArticles(action) {
  try {
    const { articles, articlesCount } = yield call(
      action.tab === "all" ? API.Article.all : API.Article.feed,
      action.page,
    );
    yield put(loadArticlesSuccess(articles, articlesCount));
  } catch (err) {
    yield put(loadArticlesFailure(err));
  }
}

export function* loadTags() {
  const { tags } = yield call(API.Tag.getAll);
  yield put(loadTagsSuccess(tags));
}

export function* likeArticle({ slug }) {
  yield call(API.Article.favorite, slug);
}

export function* unlikeArticle({ slug }) {
  yield call(API.Article.unfavorite, slug);
}

export function* loadArticlesSaga() {
  yield takeLatest(LOAD_ARTICLES, loadArticles);
}

export function* loadTagsSaga() {
  yield takeLatest(LOAD_POPULAR_TAGS, loadTags);
}

export function* likeArticleSaga() {
  yield takeLatest(LIKE_ARTICLE, likeArticle);
}

export function* unlikeArticleSaga() {
  yield takeLatest(UNLIKE_ARTICLE, unlikeArticle);
}
export default function* articlesSaga() {
  yield all([
    fork(loadArticlesSaga),
    fork(loadTagsSaga),
    fork(likeArticleSaga),
    fork(unlikeArticleSaga),
  ]);
}
