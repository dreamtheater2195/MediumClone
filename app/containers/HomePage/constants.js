/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = "Home/CHANGE_USERNAME";
export const LOAD_ARTICLES = "Home/LOAD_ARTICLES";
export const LOAD_ARTICLES_SUCCESS = "Home/LOAD_ARTICLES_SUCCESS";
export const LOAD_ARTICLES_FAILURE = "Home/LOAD_ARTICLES_FAILURE";
export const LOAD_POPULAR_TAGS = "Home/LOAD_POPULAR_TAGS";
export const LOAD_POPULAR_TAGS_SUCCESS = "Home/LOAD_POPULAR_TAGS_SUCCESS";

export const LOAD_ARTICLE_WITH_TAG = "Home/LOAD_ARTICLE_WITH_TAG";
export const LOAD_ARTICLE_WITH_TAG_SUCCESS =
  "Home/LOAD_ARTICLE_WITH_TAG_SUCCESS";
export const LOAD_ARTICLE_WITH_TAG_FAILURE =
  "Home/LOAD_ARTICLE_WITH_TAG_FAILURE";
