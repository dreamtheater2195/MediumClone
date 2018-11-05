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

export {
  selectArticlesList,
  makeSelectArticles,
  makeSelectLoading,
  makeSelectTags,
};
