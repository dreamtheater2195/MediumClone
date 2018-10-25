import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser } from "containers/App/selectors";
import { Helmet } from "react-helmet";
import toastr from "toastr";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import coverImage from "assets/img/examples/city.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import settingPageStyle from "assets/jss/material-kit-pro-react/views/settingPageStyle";
import image from "assets/img/faces/avatar.jpg";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { saveProfile } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectSaving, makeSelectErrors } from "./selectors";
export class SettingPage extends Component {
  state = {
    currentUser: this.props.currentUser,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    saving: PropTypes.bool.isRequired,
    saveProfile: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    if (!this.props.currentUser) {
      this.props.history.push("/"); // eslint-disable-line
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saving && !this.props.errors && !this.props.saving) {
      toastr.success("Profile updated successfully!");
    }
  }

  handleInputChange = field => event => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [field]: event.target.value,
      },
    });
  };

  handleSubmit = () => {
    this.props.saveProfile({ user: this.state.currentUser });
  };

  render() {
    const { classes, saving } = this.props;
    const { currentUser } = this.state;
    if (!currentUser) {
      return null;
    }
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
                  <ProfileUpdateForm
                    classes={classes}
                    user={currentUser}
                    onInputChange={this.handleInputChange}
                    onSubmit={this.handleSubmit}
                    saving={saving}
                  />
                </GridItem>
                <GridItem md={4} sm={4} className={classes.mlAuto}>
                  <h5 className={`${classes.title}`}>Profile picture</h5>
                  <img
                    src={currentUser.image}
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
  saving: makeSelectSaving(),
  errors: makeSelectErrors(),
});
const withReducer = injectReducer({ key: "settings", reducer });
const withStyle = withStyles(settingPageStyle);
const withSaga = injectSaga({ key: "settings", saga });
const withConnect = connect(
  mapStateToProps,
  { saveProfile },
);

export default compose(
  withConnect,
  withSaga,
  withReducer,
  withStyle,
)(SettingPage);
