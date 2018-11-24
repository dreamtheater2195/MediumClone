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
  DELETE_COMMENT,
  CREATE_COMMENT_SUCCESS,
} from "./constants";

export const initialState = fromJS({
  loading: true,
  article: null,
  errors: null,
  comments: [],
});

function articlePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLE:
      return state.set("loading", true);
    case LOAD_ARTICLE_SUCCESS:
      return state
        .set("loading", false)
        .set("article", fromJS(action.article))
        .set("errors", null)
        .set("comments", fromJS(action.comments));
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
    case DELETE_COMMENT:
      return state.set(
        "comments",
        state
          .get("comments")
          .filter(comment => comment.get("id") !== action.commentId),
      );
    case CREATE_COMMENT_SUCCESS:
      return state.set(
        "comments",
        state.get("comments").unshift(fromJS(action.comment)),
      );
    default:
      return state;
  }
}

export default articlePageReducer;
