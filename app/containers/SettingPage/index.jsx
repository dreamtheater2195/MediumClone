import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser } from "containers/App/selectors";
import { Helmet } from "react-helmet";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import coverImage from "assets/img/examples/city.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import settingPageStyle from "assets/jss/material-kit-pro-react/views/settingPageStyle";
import image from "assets/img/faces/avatar.jpg";
import ProfileUpdateForm from "./ProfileUpdateForm";

export class SettingPage extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currentUser: PropTypes.object,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (!this.props.currentUser) {
      this.props.history.push("/"); // eslint-disable-line
    }
  }

  render() {
    const { classes, currentUser } = this.props;
    return (
      <div>
        <Helmet>
          <title>Settings</title>
          <meta name="description" content="Setting page" />
        </Helmet>
        <Parallax
          image={coverImage}
          filter="dark"
          className={classes.parallax}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.contactContent}>
            <div className={classes.container}>
              <h2 className={classes.title}>Your profile</h2>
              <GridContainer>
                <GridItem md={6} sm={6}>
                  <ProfileUpdateForm classes={classes} user={currentUser} />
                </GridItem>
                <GridItem md={4} sm={4} className={classes.mlAuto}>
                  <h5 className={`${classes.title}`}>Profile picture</h5>
                  <img
                    src={image}
                    alt="..."
                    className={`${classes.imgRaised} ${classes.imgRounded} ${
                      classes.profilePicture
                    }`}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withStyle = withStyles(settingPageStyle);
const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withStyle,
)(SettingPage);
