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

export { makeSelectProfile, makeSelectLoading, makeSelectErrors };
