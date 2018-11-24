import { takeLatest, put, call, all } from "redux-saga/effects";
import { LOAD_ARTICLE } from "./constants";
import API from "../../api";
import { loadArticleSuccess, loadArticleFailure } from "./actions";

export function* loadArticle({ slug }) {
  try {
    const [{ article }, { comments }] = yield all([
      call(API.Article.get, slug),
      call(API.Comment.forArticle, slug),
    ]);
    yield put(loadArticleSuccess(article, comments));
  } catch (err) {
    yield put(loadArticleFailure({ errors: err }));
  }
}

// Individual exports for testing
export default function* loadArticleSaga() {
  yield takeLatest(LOAD_ARTICLE, loadArticle);
}
