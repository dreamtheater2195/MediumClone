/*
 *
 * ArticlePage actions
 *
 */

import {
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE,
  DELETE_COMMENT,
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  DELETE_ARTICLE,
} from "./constants";

export function loadArticle(slug) {
  return {
    type: LOAD_ARTICLE,
    slug,
  };
}

export function loadArticleSuccess(article, comments) {
  return {
    type: LOAD_ARTICLE_SUCCESS,
    article,
    comments,
  };
}

export function loadArticleFailure(errors) {
  return {
    type: LOAD_ARTICLE_FAILURE,
    errors,
  };
}

export function deleteComment(slug, commentId) {
  return {
    type: DELETE_COMMENT,
    slug,
    commentId,
  };
}

export function createComment(slug, commentBody) {
  return {
    type: CREATE_COMMENT,
    slug,
    commentBody,
  };
}

export function createCommentSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    comment,
  };
}

export function deleteArticle(slug) {
  return {
    type: DELETE_ARTICLE,
    slug,
  };
}
