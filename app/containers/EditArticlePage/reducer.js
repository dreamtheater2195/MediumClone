/*
 *
 * EditArticlePage reducer
 *
 */

import { fromJS } from "immutable";
import {
  LOAD_EDITOR,
  LOAD_EDITOR_SUCCESS,
  UPDATE_FIELD,
  SUBMIT_ARTICLE,
  SUBMIT_ARTICLE_SUCCESS,
  UPDATE_TAGS,
} from "./constants";

export const initialState = fromJS({
  articleSlug: "",
  body: "",
  description: "",
  title: "",
  tagList: [],
  loading: false,
  saving: false,
  errors: null,
});

function editArticlePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EDITOR:
      return state.set("loading", true);
    case LOAD_EDITOR_SUCCESS:
      return state
        .set("articleSlug", action.article ? action.article.slug : "")
        .set("body", action.article ? action.article.body : "")
        .set("description", action.article ? action.article.description : "")
        .set("title", action.article ? action.article.title : "")
        .set("tagList", action.article ? action.article.tagList : [])
        .set("loading", false);
    case UPDATE_FIELD:
      return state.set(action.field, action.value);
    case SUBMIT_ARTICLE:
      return state.set("saving", true);
    case SUBMIT_ARTICLE_SUCCESS:
      return state.set("saving", false).set("errors", null);
    case UPDATE_TAGS:
      return state.set("tagList", action.tags);
    default:
      return state;
  }
}

export default editArticlePageReducer;
