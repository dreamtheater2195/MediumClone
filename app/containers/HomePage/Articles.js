import React from "react";
import PropTypes from "prop-types";
import Article from "./Article";

const Articles = ({ articles, classes, likeArticle, unlikeArticle }) => (
  <div>
    {articles.map((article, index) => (
      <Article
        article={article}
        classes={classes}
        key={index}
        likeArticle={likeArticle}
        unlikeArticle={unlikeArticle}
      />
    ))}
  </div>
);

Articles.propTypes = {
  articles: PropTypes.object,
  classes: PropTypes.object,
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func,
};

export default Articles;
