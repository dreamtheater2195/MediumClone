/*
 * Home Actions
 *
*/
import {
  CHANGE_USERNAME,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES,
  LOAD_ARTICLES_FAILURE,
  LOAD_POPULAR_TAGS,
  LOAD_POPULAR_TAGS_SUCCESS,
} from "./constants";

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function loadArticles(tab, page) {
  return {
    type: LOAD_ARTICLES,
    tab,
    page,
  };
}

export function loadArticlesSuccess(articles, articlesCount) {
  return {
    type: LOAD_ARTICLES_SUCCESS,
    articles,
    articlesCount,
  };
}

export function loadArticlesFailure(errors) {
  return {
    type: LOAD_ARTICLES_FAILURE,
    errors,
  };
}

export function loadPopularTags() {
  return {
    type: LOAD_POPULAR_TAGS,
  };
}

export function loadTagsSuccess(tags) {
  return {
    type: LOAD_POPULAR_TAGS_SUCCESS,
    tags,
  };
}
