/*
 *
 * ProfilePage actions
 *
 */

import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  FOLLOW_USER,
  UNFOLLOW_USER,
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

export function followUser({ username }) {
  return {
    type: FOLLOW_USER,
    username,
  };
}

export function unfollowUser({ username }) {
  return {
    type: UNFOLLOW_USER,
    username,
  };
}
