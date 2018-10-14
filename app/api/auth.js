import request from "./request";

export default {
  current: () => request.get("/user"),
  login: (email, password) =>
    request.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    request.post("/users", { user: { username, email, password } }),
  save: user => request.put("/user", { user }),
};
