/*
 * Home Actions
 *
*/
import {
  CHANGE_USERNAME,
  LOAD_GLOBAL_ARTICLES_SUCCESS,
  LOAD_GLOBAL_ARTICLES,
  LOAD_GLOBAL_ARTICLES_FAILURE,
  LOAD_POPULAR_TAGS,
  LOAD_POPULAR_TAGS_SUCCESS,
} from "./constants";

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function loadGlobalArticles(page) {
  return {
    type: LOAD_GLOBAL_ARTICLES,
    page,
  };
}

export function loadGlobalArticlesSuccess(articles, articlesCount) {
  return {
    type: LOAD_GLOBAL_ARTICLES_SUCCESS,
    articles,
    articlesCount,
  };
}

export function loadGlobalArticlesFailure(errors) {
  return {
    type: LOAD_GLOBAL_ARTICLES_FAILURE,
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
