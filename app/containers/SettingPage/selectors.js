import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectSettings = state => state.get("settings", initialState);

const makeSelectSaving = () =>
  createSelector(selectSettings, settingsState => settingsState.get("saving"));

const makeSelectErrors = () =>
  createSelector(selectSettings, settingsState => settingsState.get("errors"));
export { selectSettings, makeSelectSaving, makeSelectErrors };
