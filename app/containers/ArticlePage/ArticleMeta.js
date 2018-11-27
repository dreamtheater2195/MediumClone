import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import coverImg from "assets/img/bg5.jpg";

const ArticleMeta = ({
  currentUser,
  loading,
  classes,
  article,
  deleteArticle,
}) => {
  const currentUsername = currentUser ? currentUser.get("username") : "";
  const authorUsername = article ? article.getIn(["author", "username"]) : "";
  return (
    <Parallax className={classes.parallax} image={coverImg} filter="dark">
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem md={8} className={classes.textCenter}>
            {loading ? (
              <h1 className={classes.title}>Loading Article...</h1>
            ) : (
              <Fragment>
                <h1 className={classes.title}>{article.get("title")}</h1>
                <h4 className={classes.subtitle}>
                  {article.get("description")}
                </h4>
                <br />
                {currentUsername === authorUsername && (
                  <Fragment>
                    <Link to={`/editor/${article.get("slug")}`}>
                      <Button color="info" size="lg" round>
                        Edit Article
                      </Button>{" "}
                    </Link>
                    <Button
                      color="rose"
                      size="lg"
                      round
                      onClick={() => deleteArticle(article.get("slug"))}
                    >
                      Delete Article
                    </Button>
                  </Fragment>
                )}
              </Fragment>
            )}
          </GridItem>
        </GridContainer>
      </div>
    </Parallax>
  );
};

ArticleMeta.propTypes = {
  loading: PropTypes.bool.isRequired,
  article: PropTypes.object,
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  deleteArticle: PropTypes.func,
};

export default ArticleMeta;
