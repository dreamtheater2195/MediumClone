/**
 *
 * ProfilePage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser } from "containers/App/selectors";
import { compose } from "redux";
import { push } from "react-router-redux";
import { Helmet } from "react-helmet";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "components/CustomButtons/Button";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Settings from "@material-ui/icons/Settings";
import coverImage from "assets/img/examples/city.jpg";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle";
import {
  makeSelectProfile,
  makeSelectLoading,
  makeSelectErrors,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { loadProfile, followUser, unfollowUser } from "./actions";
/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.loadProfile(this.props.match.params.username);
  }

  renderLoading() {
    const { classes } = this.props;
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  renderHelmetAndParallax() {
    const { classes } = this.props;
    return (
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
    );
  }

  renderEditProfileButton() {
    const { classes } = this.props;
    const handleClick = () => {
      this.props.redirectTo("/settings");
      // this.props.history.push("/settings");
    };
    return (
      <div className={classes.follow}>
        <Tooltip
          id="tooltip-top"
          title="Edit your profile"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            justIcon
            round
            color="rose"
            className={classes.followButton}
            onClick={handleClick}
          >
            <Settings className={classes.followIcon} />
          </Button>
        </Tooltip>
      </div>
    );
  }

  renderFollowButton() {
    const { classes, profile, follow, unfollow } = this.props;
    const following = profile.get("following");
    const username = profile.get("username");
    const handleClick = () => {
      if (following) {
        unfollow(username);
      } else {
        follow(username);
      }
    };
    return (
      <div className={classes.follow}>
        <Tooltip
          id="tooltip-top"
          title={`${following ? "Unfollow" : "Follow"} this user`}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            justIcon
            round
            color="primary"
            className={classes.followButton}
            onClick={handleClick}
          >
            {following ? (
              <Clear className={classes.followIcon} />
            ) : (
              <Add className={classes.followIcon} />
            )}
          </Button>
        </Tooltip>
      </div>
    );
  }
  render() {
    const { classes, currentUser, profile, loading, errors } = this.props;
    if (loading) {
      return (
        <div>
          {this.renderHelmetAndParallax()}
          {this.renderLoading()}
        </div>
      );
    }

    if (errors) {
      return <NotFoundPage />;
    }

    if (!profile) {
      return null;
    }

    const isCurrentUser = currentUser.username === profile.get("username");
    return (
      <div>
        {this.renderHelmetAndParallax()}
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={profile.get("image")}
                      alt="..."
                      className={classNames(
                        classes.imgRaised,
                        classes.imgRoundedCircle,
                        classes.imgFluid,
                      )}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{profile.get("username")}</h3>
                  </div>
                  {isCurrentUser
                    ? this.renderEditProfileButton()
                    : this.renderFollowButton()}
                  <div className={classes.description}>
                    <p>{profile.get("bio")}</p>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  match: PropTypes.object,
  loadProfile: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const mapDispatchToProps = dispatch => ({
  loadProfile: username => {
    dispatch(loadProfile({ username }));
  },
  redirectTo: location => {
    dispatch(push(location));
  },
  follow: username => {
    dispatch(followUser({ username }));
  },
  unfollow: username => {
    dispatch(unfollowUser({ username }));
  },
});

const withStyle = withStyles(profilePageStyle);
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: "profile", reducer });
const withSaga = injectSaga({ key: "profile", saga });

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
