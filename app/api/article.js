import request from "./request";

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });
const encode = encodeURIComponent;

export default {
  all: page => request.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    request.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    request.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug => request.del(`/articles/${slug}`),
  favorite: slug => request.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    request.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => request.get("/articles/feed?limit=10&offset=0"),
  get: slug => request.get(`/articles/${slug}`),
  unfavorite: slug => request.del(`/articles/${slug}/favorite`),
  update: article =>
    request.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article => request.post("/articles", { article }),
};
