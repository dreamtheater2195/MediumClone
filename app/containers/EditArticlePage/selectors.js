import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the editArticlePage state domain
 */

const selectEditorDomain = state => state.get("editor", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditArticlePage
 */

const makeSelectEditor = () =>
  createSelector(selectEditorDomain, substate => substate);

export { makeSelectEditor };
