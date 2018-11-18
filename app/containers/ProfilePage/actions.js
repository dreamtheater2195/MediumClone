/*
 *
 * ProfilePage actions
 *
 */

import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
} from "./constants";

export function loadProfile({ username }) {
  return {
    type: LOAD_PROFILE,
    username,
  };
}

export function loadProfileSuccess({ profile }) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    profile,
  };
}

export function loadProfileError({ errors }) {
  return {
    type: LOAD_PROFILE_ERROR,
    errors,
  };
}
