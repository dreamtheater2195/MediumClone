/*
 * HomeReducer
 */
import { fromJS } from "immutable";

import {
  LOAD_GLOBAL_ARTICLES,
  LOAD_GLOBAL_ARTICLES_SUCCESS,
  LOAD_GLOBAL_ARTICLES_FAILURE,
  LOAD_POPULAR_TAGS_SUCCESS,
} from "./constants";

export const initialState = fromJS({
  articles: [],
  articlesCount: 0,
  currentPage: 0,
  tab: "all",
  pager: undefined,
  tag: "",
  tags: [],
  errors: null,
  loading: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GLOBAL_ARTICLES:
      return state
        .set("loading", true)
        .set("errors", null)
        .set("currentPage", action.page || 0);
    case LOAD_GLOBAL_ARTICLES_SUCCESS:
      return state
        .set("articles", fromJS(action.articles))
        .set("articlesCount", action.articlesCount)
        .set("errors", null)
        .set("loading", false)
        .set("tab", "all")
        .set("tag", "");
    case LOAD_GLOBAL_ARTICLES_FAILURE:
      return state.set("errors", fromJS(action.errors)).set("loading", false);
    case LOAD_POPULAR_TAGS_SUCCESS:
      return state.set("tags", fromJS(action.tags));
    default:
      return state;
  }
}

export default homeReducer;
