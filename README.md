## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://redux.productionready.io/

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
<<<<<<< HEAD
  - [x] List of tags
  - [x] List of articles pulled from either Feed, Global, or by Tag
  - [x] Pagination for list of articles
=======
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
>>>>>>> parent of e8b1fb4... Update README.md
- [x] Sign in/Sign up pages (URL: /#/login, /#/register )
  - [x] Use JWT (store the token in localStorage)
- [x] Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- [x] Profile page (URL: /#/@username, /#/@username/favorites )
  - [x] Show basic user info
  - List of articles populated from author's created articles or author's favorited articles
