/**
 *
 * ArticlePage
 *
 */

import React from "react";
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
import { makeSelectLoading, makeSelectArticle } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { loadArticle } from "./actions";
import ArticleMeta from "./ArticleMeta";
import ArticleDetails from "./ArticleDetails";
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
    const { classes, loading, article, currentUser } = this.props;
    return (
      <div>
        <Helmet>
          <title>ArticlePage</title>
          <meta name="description" content="Description of ArticlePage" />
        </Helmet>
        <ArticleMeta
          loading={loading}
          article={article}
          classes={classes}
          currentUser={currentUser}
        />
        <div className={classnames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {loading ? (
              <div className={classes.progress}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <ArticleDetails
                article={article}
                classes={classes}
                currentUser={currentUser}
              />
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
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  article: makeSelectArticle(),
  loading: makeSelectLoading(),
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  { loadArticle },
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
