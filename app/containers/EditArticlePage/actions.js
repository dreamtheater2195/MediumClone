/*
 *
 * EditArticlePage actions
 *
 */

import {
  LOAD_EDITOR,
  UPDATE_FIELD,
  SUBMIT_ARTICLE,
  UPDATE_TAGS,
} from "./constants";

export function loadEditor(slug) {
  return {
    type: LOAD_EDITOR,
    slug,
  };
}

export function updateField(field, value) {
  return {
    type: UPDATE_FIELD,
    field,
    value,
  };
}

export function submitArticle(article) {
  return {
    type: SUBMIT_ARTICLE,
    article,
  };
}

export function updateTags(tags) {
  return {
    type: UPDATE_TAGS,
    tags,
  };
}
