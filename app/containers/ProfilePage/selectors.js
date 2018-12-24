import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the profilePage state domain
 */

const selectProfileDomain = state => state.get("profile", initialState);

const makeSelectProfile = () =>
  createSelector(selectProfileDomain, substate => substate.get("profile"));

const makeSelectLoading = () =>
  createSelector(selectProfileDomain, substate => substate.get("loading"));

const makeSelectErrors = () =>
  createSelector(selectProfileDomain, substate => substate.get("errors"));

const makeSelectArticles = () =>
  createSelector(selectProfileDomain, substate => substate.get("articles"));

const makeSelectArticlesLoading = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get("articlesLoading"),
  );
const makeSelectArticlesError = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get("articlesError"),
  );

const makeSelectArticlesCount = () =>
  createSelector(selectProfileDomain, substate =>
    substate.get("articlesCount"),
  );

export {
  makeSelectProfile,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectArticles,
  makeSelectArticlesCount,
  makeSelectArticlesError,
  makeSelectArticlesLoading,
};
