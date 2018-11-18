/*
 *
 * ArticlePage reducer
 *
 */

import { fromJS } from "immutable";
import {
  LIKE_ARTICLE,
  UNLIKE_ARTICLE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "containers/App/constants";
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
    case LIKE_ARTICLE:
      return state
        .setIn(["article", "favorited"], true)
        .setIn(
          ["article", "favoritesCount"],
          state.getIn(["article", "favoritesCount"]) + 1,
        );
    case UNLIKE_ARTICLE:
      return state
        .setIn(["article", "favorited"], false)
        .setIn(
          ["article", "favoritesCount"],
          state.getIn(["article", "favoritesCount"]) - 1,
        );
    case FOLLOW_USER: {
      const author = state.getIn(["article", "author"]);
      return state.setIn(["article", "author"], author.set("following", true));
    }
    case UNFOLLOW_USER: {
      const author = state.getIn(["article", "author"]);
      return state.setIn(["article", "author"], author.set("following", false));
    }
    default:
      return state;
  }
}

export default articlePageReducer;
