import request from "./request";

export default {
  create: (slug, comment) =>
    request.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    request.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => request.get(`/articles/${slug}/comments`),
};
