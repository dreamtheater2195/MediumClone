/**
 *
 * ArticlePage
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";
import articlePageStyle from "assets/jss/material-kit-pro-react/views/articlePageStyle";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { makeSelectCurrentUser } from "containers/App/selectors";
import {
  likeArticle,
  unlikeArticle,
  followUser,
  unfollowUser,
} from "containers/App/actions";
import {
  makeSelectLoading,
  makeSelectArticle,
  makeSelectArticleComments,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {
  loadArticle,
  deleteComment,
  createComment,
  deleteArticle,
} from "./actions";
import ArticleMeta from "./ArticleMeta";
import ArticleDetails from "./ArticleDetails";
import ArticleComments from "./ArticleComments";

/* eslint-disable react/prefer-stateless-function */
export class ArticlePage extends React.Component {
  componentDidMount() {
    this.props.loadArticle(this.props.match.params.slug);
  }

  renderLoading() {
    const { classes } = this.props;
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  render() {
    const { classes, loading, article, currentUser, comments } = this.props;
    return (
      <div>
        <Helmet>
          <title>{article ? article.get("title") : "Article"}</title>
          <meta name="description" content="Article details" />
        </Helmet>
        <ArticleMeta
          loading={loading}
          article={article}
          classes={classes}
          currentUser={currentUser}
          deleteArticle={this.props.deleteArticle}
        />
        <div className={classnames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {loading ? (
              <div className={classes.progress}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <Fragment>
                <ArticleDetails
                  article={article}
                  classes={classes}
                  currentUser={currentUser}
                  onLikeArticle={this.props.likeArticle}
                  onUnlikeArticle={this.props.unlikeArticle}
                  onFollowUser={this.props.followUser}
                  onUnfollowUser={this.props.unfollowUser}
                />
                <ArticleComments
                  classes={classes}
                  currentUser={currentUser}
                  comments={comments}
                  articleSlug={article.get("slug")}
                  deleteComment={this.props.deleteComment}
                  createComment={this.props.createComment}
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ArticlePage.propTypes = {
  classes: PropTypes.object.isRequired,
  loadArticle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  article: PropTypes.object,
  comments: PropTypes.object,
  currentUser: PropTypes.object,
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  deleteComment: PropTypes.func,
  createComment: PropTypes.func,
  deleteArticle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  article: makeSelectArticle(),
  loading: makeSelectLoading(),
  currentUser: makeSelectCurrentUser(),
  comments: makeSelectArticleComments(),
});

const withConnect = connect(
  mapStateToProps,
  {
    loadArticle,
    likeArticle,
    unlikeArticle,
    unfollowUser,
    followUser,
    deleteComment,
    createComment,
    deleteArticle,
  },
);

const withReducer = injectReducer({ key: "article", reducer });
const withSaga = injectSaga({ key: "article", saga });
const withStyle = withStyles(articlePageStyle);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(ArticlePage);
