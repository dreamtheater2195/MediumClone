/*
 *
 * ArticlePage reducer
 *
 */

import { fromJS } from "immutable";
import {
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE,
} from "./constants";

export const initialState = fromJS({
  loading: true,
  article: null,
  errors: null,
});

function articlePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLE:
      return state.set("loading", true);
    case LOAD_ARTICLE_SUCCESS:
      return state
        .set("loading", false)
        .set("article", fromJS(action.article))
        .set("errors", null);
    case LOAD_ARTICLE_FAILURE:
      return state.set("loading", false).set("errors", fromJS(action.errors));
    default:
      return state;
  }
}

export default articlePageReducer;
