import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import { push } from "react-router-redux";
import toastr from "toastr";
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
      toastr.success("Update article successfully");
      yield put(push(`/article/${updatedArticle.slug}`));
    } else {
      // create
      const { article: createdArticle } = yield call(
        API.Article.create,
        article,
      );
      yield put({ type: SUBMIT_ARTICLE_SUCCESS, article: createdArticle });
      toastr.success("Create article successfully");
      yield put(push(`/article/${createdArticle.slug}`));
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
