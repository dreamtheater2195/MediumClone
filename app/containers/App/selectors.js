import { createSelector } from "reselect";

const selectGlobal = state => state.get("global");

const selectRoute = state => state.get("route");

const makeSelectAppLoaded = () =>
  createSelector(selectGlobal, globalState => globalState.get("appLoaded"));

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get("currentUser"));

const makeSelectToken = () =>
  createSelector(selectGlobal, globalState => globalState.get("token"));

const makeSelectAuth = () =>
  createSelector(selectGlobal, globalState => globalState.get("auth").toJS());

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(["userData", "repositories"]),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get("location").toJS());

const makeSelectRedirectTo = () =>
  createSelector(selectGlobal, globalState => globalState.get("redirectTo"));
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectToken,
  makeSelectAuth,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectAppLoaded,
  makeSelectRedirectTo,
};
