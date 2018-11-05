import React from "react";
import PropTypes from "prop-types";
import Media from "components/Media/Media";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button";
import Favorite from "@material-ui/icons/Favorite";
import Clearfix from "components/Clearfix/Clearfix";
import Muted from "components/Typography/Muted";
import Badge from "components/Badge/Badge";

const Article = ({ article, classes, likeArticle, unlikeArticle }) => {
  const toggleLikeArticle = () => {
    if (article.get("favorited")) {
      unlikeArticle(article.get("slug"));
    } else {
      likeArticle(article.get("slug"));
    }
  };
  return (
    <Media
      avatar={article.get("author").get("image")}
      avatarAlt={article.get("author").get("username")}
      title={
        <span>
          <Link to={`/profile/@${article.get("author").get("username")}`}>
            {article.get("author").get("username")}
          </Link>{" "}
          <small>· {moment(article.get("createdAt")).format("lll")}</small>
        </span>
      }
      body={
        <div>
          <div style={{ float: "left", maxWidth: "60%" }}>
            <h4 className={classes.articleTitle}>{article.get("title")}</h4>
            <h5>{article.get("description")}</h5>
          </div>
          <Button
            color="danger"
            simple={!article.get("favorited")}
            size="sm"
            round
            className={classes.footerButtons}
            onClick={toggleLikeArticle}
          >
            <Favorite />
            {article.get("favoritesCount")}
          </Button>
        </div>
      }
      footer={
        <div>
          <Clearfix />
          <Muted>Read more...</Muted>
          <div className={classes.articleTags}>
            {article
              .get("tagList")
              .map((tag, i) => <Badge key={i}>{tag}</Badge>)}
          </div>
          <Clearfix />
          <hr />
        </div>
      }
    />
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func,
};
export default Article;
