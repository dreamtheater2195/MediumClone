import request from "./request";

export default {
  getAll: () => request.get("/tags"),
};
