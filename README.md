## Functionality overview

The example application is a social blogging site. It uses a custom API for all requests, including authentication.

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
  - [x] List of tags
  - [x] List of articles pulled from either Feed, Global, or by Tag
  - [x] Pagination for list of articles
- [x] Sign in/Sign up pages (URL: /#/login, /#/register )
  - [x] Use JWT (store the token in localStorage)
- [x] Settings page (URL: /#/settings )
- [x] Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- [x] Article page (URL: /#/article/article-slug-here )
  - [x] Delete article button (only shown to article's author)
  - [x] Render markdown from server client side
  - [x] Comments section at bottom of page
  - [x] Delete comment button (only shown to comment's author)
- [x] Profile page (URL: /#/@username, /#/@username/favorites )
  - [x] Show basic user info
  - List of articles populated from author's created articles or author's favorited articles
