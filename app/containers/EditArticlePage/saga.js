import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import {
  LOAD_EDITOR,
  LOAD_EDITOR_SUCCESS,
  SUBMIT_ARTICLE,
  SUBMIT_ARTICLE_SUCCESS,
} from "./constants";
import API from "../../api";

export function* loadEditor({ slug }) {
  try {
    if (slug) {
      const { article } = yield call(API.Article.get, slug);
      yield put({ type: LOAD_EDITOR_SUCCESS, article });
    } else {
      yield put({ type: LOAD_EDITOR_SUCCESS });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* submitArticle({ article }) {
  try {
    if (article.slug) {
      // update
      const { article: updatedArticle } = yield call(
        API.Article.update,
        article,
      );
      yield put({ type: SUBMIT_ARTICLE_SUCCESS, article: updatedArticle });
    } else {
      // create
      const { article: createdArticle } = yield call(
        API.Article.create,
        article,
      );
      yield put({ type: SUBMIT_ARTICLE_SUCCESS, article: createdArticle });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* submitArticleSaga() {
  yield takeLatest(SUBMIT_ARTICLE, submitArticle);
}

export function* loadEditorSaga() {
  yield takeLatest(LOAD_EDITOR, loadEditor);
}

export default function* editorSaga() {
  yield all([fork(loadEditorSaga), fork(submitArticleSaga)]);
}
