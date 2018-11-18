/*
 * HomeReducer
 */
import { fromJS } from "immutable";
import { LIKE_ARTICLE, UNLIKE_ARTICLE } from "containers/App/constants";
import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_FAILURE,
  LOAD_POPULAR_TAGS_SUCCESS,
  LOAD_ARTICLE_WITH_TAG,
  LOAD_ARTICLE_WITH_TAG_SUCCESS,
} from "./constants";

export const initialState = fromJS({
  articles: [],
  articlesCount: 0,
  currentPage: 0,
  tab: "all",
  tag: "",
  tags: [],
  errors: null,
  loading: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return state
        .set("loading", true)
        .set("errors", null)
        .set("currentPage", action.page || 0)
        .set("tab", action.tab);
    case LOAD_ARTICLES_SUCCESS:
      return state
        .set("articles", fromJS(action.articles))
        .set("articlesCount", action.articlesCount)
        .set("errors", null)
        .set("loading", false);
    case LOAD_ARTICLES_FAILURE:
      return state.set("errors", fromJS(action.errors)).set("loading", false);
    case LOAD_ARTICLE_WITH_TAG:
      return state
        .set("loading", true)
        .set("errors", null)
        .set("currentPage", action.page || 0)
        .set("tab", null)
        .set("tag", action.tag);
    case LOAD_ARTICLE_WITH_TAG_SUCCESS:
      return state
        .set("loading", false)
        .set("errors", null)
        .set("articles", fromJS(action.articles))
        .set("articlesCount", action.articlesCount);
    case LOAD_POPULAR_TAGS_SUCCESS:
      return state.set("tags", fromJS(action.tags));
    case LIKE_ARTICLE:
      return state.set(
        "articles",
        state.get("articles").map(article => {
          if (article.get("slug") === action.slug) {
            return article
              .set("favorited", true)
              .set("favoritesCount", article.get("favoritesCount") + 1);
          }
          return article;
        }),
      );
    case UNLIKE_ARTICLE:
      return state.set(
        "articles",
        state.get("articles").map(article => {
          if (article.get("slug") === action.slug) {
            return article
              .set("favorited", false)
              .set("favoritesCount", article.get("favoritesCount") - 1);
          }
          return article;
        }),
      );
    default:
      return state;
  }
}

export default homeReducer;
