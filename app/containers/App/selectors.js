import { createSelector } from "reselect";

const selectGlobal = state => state.get("global");

const selectRoute = state => state.get("route");

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

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectToken,
  makeSelectAuth,
  makeSelectRepos,
  makeSelectLocation,
};
