/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from "immutable";
import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
} from "./constants";

export const initialState = fromJS({
  errors: null,
  loading: true,
  profile: null,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return state.set("loading", true).set("errors", null);
    case LOAD_PROFILE_SUCCESS:
      return state
        .set("loading", false)
        .set("errors", null)
        .set("profile", action.profile);
    case LOAD_PROFILE_ERROR:
      return state
        .set("loading", false)
        .set("errors", action.errors)
        .set("profile", null);
    default:
      return state;
  }
}

export default profilePageReducer;
