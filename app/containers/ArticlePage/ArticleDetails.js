import React from "react";
import PropTypes from "prop-types";
import marked from "marked";
import he from "he";
import hljs from "highlight.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Badge from "components/Badge/Badge";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardAvatar from "components/Card/CardAvatar";
import profileImage from "assets/img/faces/avatar.jpg";
import Favorite from "@material-ui/icons/Favorite";

const ArticleDetails = ({
  classes,
  article,
  currentUser,
  onLikeArticle,
  onUnlikeArticle,
  onFollowUser,
  onUnfollowUser,
}) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer,
    breaks: true,
    highlight(code, lang) {
      if (!lang) {
        return hljs.highlightAuto(code).value;
      }
      return hljs.this.highlight(code, lang).value;
    },
  });
  const markedBody = marked(he.decode(article.get("body")));

  const renderFollowButton = () => {
    const currentUsername = currentUser ? currentUser.get("username") : "";
    const authorUsername = article.getIn(["author", "username"]);
    if (currentUsername !== "" && currentUsername !== authorUsername) {
      return (
        <GridItem xs={12} sm={2} md={2}>
          <Button
            round
            onClick={toggleFollowUser}
            color={article.getIn(["author", "following"]) ? "info" : "github"}
            className={classes.pullRight}
          >
            {article.getIn(["author", "following"]) ? "Following" : "Follow"}
          </Button>
        </GridItem>
      );
    }
    return null;
  };

  const toggleLikeArticle = () => {
    if (article.get("favorited")) {
      onUnlikeArticle(article.get("slug"));
    } else {
      onLikeArticle(article.get("slug"));
    }
  };

  const toggleFollowUser = () => {
    const username = article.getIn(["author", "username"]);
    if (article.getIn(["author", "following"])) {
      onUnfollowUser({ username });
    } else {
      onFollowUser({ username });
    }
  };
  return (
    <div>
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: markedBody }}
            />
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <div className={classes.blogTags}>
                  {article.get("tagList").map((tag, i) => (
                    <Badge color="primary" key={i}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Button
                  round
                  color="rose"
                  className={classes.favoriteButton}
                  simple={!article.get("favorited")}
                  onClick={toggleLikeArticle}
                >
                  <Favorite />
                  {article.get("favoritesCount")}
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={10} md={8}>
            <hr />
            <Card plain profile className={classes.card}>
              <GridContainer>
                <GridItem xs={12} sm={2} md={2}>
                  <CardAvatar plain profile>
                    <img
                      src={article.getIn(["author", "image"]) || profileImage}
                      alt="..."
                    />
                  </CardAvatar>
                </GridItem>
                <GridItem xs={12} sm={8} md={8}>
                  <h4 className={classes.cardTitle}>
                    {article.getIn(["author", "username"])}
                  </h4>
                  <p className={classes.bio}>
                    {article.getIn(["author", "bio"])}
                  </p>
                </GridItem>
                {renderFollowButton()}
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

ArticleDetails.propTypes = {
  article: PropTypes.object,
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  onUnlikeArticle: PropTypes.func,
  onLikeArticle: PropTypes.func,
  onFollowUser: PropTypes.func,
  onUnfollowUser: PropTypes.func,
};

export default ArticleDetails;
