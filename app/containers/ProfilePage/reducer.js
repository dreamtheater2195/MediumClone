/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from "immutable";
import { FOLLOW_USER, UNFOLLOW_USER } from "containers/App/constants";
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
        .set("profile", fromJS(action.profile));
    case LOAD_PROFILE_ERROR:
      return state
        .set("loading", false)
        .set("errors", fromJS(action.errors))
        .set("profile", null);
    case FOLLOW_USER:
      return state.setIn(["profile", "following"], true);
    case UNFOLLOW_USER:
      return state.setIn(["profile", "following"], false);
    default:
      return state;
  }
}

export default profilePageReducer;
