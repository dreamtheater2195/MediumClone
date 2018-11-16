/*
 *
 * ArticlePage actions
 *
 */

import {
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE,
} from "./constants";

export function loadArticle(slug) {
  return {
    type: LOAD_ARTICLE,
    slug,
  };
}

export function loadArticleSuccess(article) {
  return {
    type: LOAD_ARTICLE_SUCCESS,
    article,
  };
}

export function loadArticleFailure(errors) {
  return {
    type: LOAD_ARTICLE_FAILURE,
    errors,
  };
}
