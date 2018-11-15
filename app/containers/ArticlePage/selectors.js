import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the articlePage state domain
 */

const selectArticlePageDomain = state => state.get("articlePage", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ArticlePage
 */

const makeSelectArticlePage = () =>
  createSelector(selectArticlePageDomain, substate => substate.toJS());

export default makeSelectArticlePage;
export { selectArticlePageDomain };
