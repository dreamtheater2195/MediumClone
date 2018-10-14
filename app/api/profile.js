import request from "./request";

export default {
  follow: username => request.post(`/profiles/${username}/follow`),
  get: username => request.get(`/profiles/${username}`),
  unfollow: username => request.del(`/profiles/${username}/follow`),
};
