import { takeLatest, put, call } from "redux-saga/effects";
import { LOAD_ARTICLE } from "./constants";
import API from "../../api";
import { loadArticleSuccess, loadArticleFailure } from "./actions";

export function* loadArticle({ slug }) {
  try {
    const { article } = yield call(API.Article.get, slug);
    yield put(loadArticleSuccess(article));
  } catch (err) {
    yield put(loadArticleFailure({ errors: err }));
  }
}

// Individual exports for testing
export default function* loadArticleSaga() {
  yield takeLatest(LOAD_ARTICLE, loadArticle);
}
