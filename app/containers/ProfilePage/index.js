/**
 *
 * ProfilePage
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { Helmet } from "react-helmet";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import coverImage from "assets/img/examples/city.jpg";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import withAuth from "utils/withAuth";
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle";
import {
  followUser,
  unfollowUser,
  likeArticle,
  unlikeArticle,
} from "containers/App/actions";
import {
  makeSelectProfile,
  makeSelectLoading,
  makeSelectErrors,
  makeSelectArticles,
  makeSelectArticlesCount,
  makeSelectArticlesError,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { loadProfile, loadArticles } from "./actions";

import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./ProfileTabs";
/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  state = {
    currentTab: 0,
  };

  componentDidMount() {
    this.props.loadProfile(this.props.match.params.username);
    this.props.loadArticles("author", this.props.match.params.username);
  }

  onTabChange = (event, value) => {
    this.setState({ currentTab: value });
    this.props.loadArticles(
      value === 0 ? "author" : "favorite",
      this.props.match.params.username,
    );
  };
  render() {
    const {
      classes,
      currentUser,
      profile,
      loading,
      errors,
      history,
      follow,
      unfollow,
      articles,
      articlesLoading,
      articlesError,
    } = this.props;

    if (errors) {
      return <NotFoundPage />;
    }

    if (loading) {
      return (
        <Fragment>
          <div>
            <Helmet>
              <title>Profile</title>
              <meta name="description" content="Profile page" />
            </Helmet>
            <Parallax
              image={coverImage}
              className={classes.parallax}
              filter="dark"
            />
          </div>
          <div className={classes.progress}>
            <CircularProgress color="secondary" />
          </div>
        </Fragment>
      );
    }

    const isCurrentUser =
      currentUser.get("username") === profile.get("username");
    return (
      <Fragment>
        <div>
          <Helmet>
            <title>Profile</title>
            <meta name="description" content="Profile page" />
          </Helmet>
          <Parallax
            image={coverImage}
            className={classes.parallax}
            filter="dark"
          />
        </div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <ProfileInfo
                  classes={classes}
                  profile={profile}
                  isCurrentUser={isCurrentUser}
                  history={history}
                  follow={follow}
                  unfollow={unfollow}
                />
              </GridItem>
              <ProfileTabs
                articles={articles}
                classes={classes}
                likeArticle={this.props.likeArticle}
                unlikeArticle={this.props.unlikeArticle}
                articlesError={articlesError}
                articlesLoading={articlesLoading}
                currentTab={this.state.currentTab}
                onTabChange={this.onTabChange}
              />
            </GridContainer>
          </div>
        </div>
      </Fragment>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  match: PropTypes.object,
  loadProfile: PropTypes.func.isRequired,
  loadArticles: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  likeArticle: PropTypes.func.isRequired,
  unlikeArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  errors: PropTypes.object,
  history: PropTypes.object,
  articles: PropTypes.object,
  articlesLoading: PropTypes.bool,
  articlesError: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
  articles: makeSelectArticles(),
  articlesCount: makeSelectArticlesCount(),
  articlesLoading: makeSelectLoading(),
  articlesError: makeSelectArticlesError(),
});

const mapDispatchToProps = dispatch => ({
  loadProfile: username => {
    dispatch(loadProfile({ username }));
  },
  follow: username => {
    dispatch(followUser({ username }));
  },
  unfollow: username => {
    dispatch(unfollowUser({ username }));
  },
  loadArticles: (tab, author, page) => {
    dispatch(loadArticles(tab, author, page));
  },
  likeArticle: slug => dispatch(likeArticle(slug)),
  unlikeArticle: slug => dispatch(unlikeArticle(slug)),
});

const withStyle = withStyles(profilePageStyle);
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: "profile", reducer });
const withSaga = injectSaga({ key: "profile", saga });

export default compose(
  withAuth,
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
