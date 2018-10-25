import { fromJS } from "immutable";
import {
  SAVE_USER_PROFILE,
  SAVE_USER_PROFILE_FAILURE,
  SAVE_USER_PROFILE_SUCCESS,
} from "./constants";

export const initialState = fromJS({
  errors: null,
  saving: false,
});

function settingReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_PROFILE:
      return state.set("errors", null).set("saving", true);
    case SAVE_USER_PROFILE_SUCCESS:
      return initialState;
    case SAVE_USER_PROFILE_FAILURE:
      return state.set("errors", action.errors).set("saving", false);
    default:
      return state;
  }
}

export default settingReducer;
