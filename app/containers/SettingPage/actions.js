import {
  SAVE_USER_PROFILE,
  SAVE_USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_FAILURE,
} from "./constants";

export function saveProfile({ user }) {
  return {
    type: SAVE_USER_PROFILE,
    user,
  };
}

export function saveProfileSuccess() {
  return {
    type: SAVE_USER_PROFILE_SUCCESS,
  };
}

export function saveProfileFailure({ errors }) {
  return {
    type: SAVE_USER_PROFILE_FAILURE,
    errors,
  };
}
