import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the articlePage state domain
 */

const selectArticlePageDomain = state => state.get("article", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ArticlePage
 */

const makeSelectLoading = () =>
  createSelector(selectArticlePageDomain, substate => substate.get("loading"));

const makeSelectArticle = () =>
  createSelector(selectArticlePageDomain, substate => substate.get("article"));

const makeSelectArticleComments = () =>
  createSelector(selectArticlePageDomain, substate => substate.get("comments"));

export { makeSelectLoading, makeSelectArticle, makeSelectArticleComments };
