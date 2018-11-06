/**
 * Homepage selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectArticlesList = state => state.get("articlesList", initialState);

const makeSelectArticles = () =>
  createSelector(selectArticlesList, state => state.get("articles"));

const makeSelectLoading = () =>
  createSelector(selectArticlesList, state => state.get("loading"));

const makeSelectTags = () =>
  createSelector(selectArticlesList, state => state.get("tags"));

const makeSelectCurrentPage = () =>
  createSelector(selectArticlesList, state => state.get("currentPage"));

const makeSelectTab = () =>
  createSelector(selectArticlesList, state => state.get("tab"));

const makeSelectArticlesCount = () =>
  createSelector(selectArticlesList, state => state.get("articlesCount"));

export {
  selectArticlesList,
  makeSelectArticles,
  makeSelectLoading,
  makeSelectTags,
  makeSelectCurrentPage,
  makeSelectTab,
  makeSelectArticlesCount,
};
