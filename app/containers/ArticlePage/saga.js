import { takeLatest, put, call, all, fork } from "redux-saga/effects";
import { push } from "react-router-redux";
import {
  LOAD_ARTICLE,
  DELETE_COMMENT,
  CREATE_COMMENT,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
} from "./constants";
import API from "../../api";
import {
  loadArticleSuccess,
  loadArticleFailure,
  createCommentSuccess,
} from "./actions";

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

export function* deleteComment(action) {
  yield call(API.Comment.delete, action.slug, action.commentId);
}

export function* createComment(action) {
  try {
    const { comment } = yield call(API.Comment.create, action.slug, {
      body: action.commentBody,
    });
    yield put(createCommentSuccess(comment));
  } catch (err) {
    console.log(err);
  }
}

export function* deleteArticle(action) {
  try {
    yield call(API.Article.del, action.slug);
    yield put({ type: DELETE_ARTICLE_SUCCESS });
    yield put(push("/"));
  } catch (err) {
    yield put({ type: DELETE_ARTICLE_FAILURE });
  }
}

export function* loadArticleSaga() {
  yield takeLatest(LOAD_ARTICLE, loadArticle);
}

export function* deleteArticleSaga() {
  yield takeLatest(DELETE_ARTICLE, deleteArticle);
}

export function* deleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT, deleteComment);
}

export function* createCommentSaga() {
  yield takeLatest(CREATE_COMMENT, createComment);
}
export default function* articleSaga() {
  yield all([
    fork(loadArticleSaga),
    fork(deleteArticleSaga),
    fork(deleteCommentSaga),
    fork(createCommentSaga),
  ]);
}
