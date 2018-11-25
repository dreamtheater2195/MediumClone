import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { DAEMON } from "utils/constants";
import injectSaga from "utils/injectSaga";
import API from "api";
import HomePage from "containers/HomePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import RegisterPage from "containers/RegisterPage/Loadable";
import LoginPage from "containers/LoginPage/Loadable";
import SettingPage from "containers/SettingPage/Loadable";
import ProfilePage from "containers/ProfilePage/Loadable";
import ArticlePage from "containers/ArticlePage/Loadable";
import EditArticlePage from "containers/EditArticlePage/Loadable";
import {
  getCurrentUser,
  logoutUser,
  setAppLoaded,
} from "containers/App/actions";
import {
  makeSelectCurrentUser,
  makeSelectAppLoaded,
} from "containers/App/selectors";
import AppHeader from "./AppHeader";
import saga from "./sagas";

class App extends Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    setAppLoaded: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    appLoaded: PropTypes.bool.isRequired,
  };
  async componentDidMount() {
    this.props.setAppLoaded(false);
    const token = await localStorage.getItem("jwt");
    API.setToken(token);
    this.props.getCurrentUser();
  }
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s - React.js" defaultTitle="React.js">
          <meta name="description" content="A React.js  application" />
        </Helmet>
        {this.props.appLoaded ? (
          <Fragment>
            <AppHeader
              currentUser={this.props.currentUser}
              onSignout={this.props.logoutUser}
            />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/profile/@:username" component={ProfilePage} />
              <Route path="/article/:slug" component={ArticlePage} />
              <Route path="/editor/:slug" component={EditArticlePage} />
              <Route path="/editor" component={EditArticlePage} />
              <Route path="/settings" component={SettingPage} />
              <Route component={NotFoundPage} />
              <Route />
            </Switch>
          </Fragment>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  appLoaded: makeSelectAppLoaded(),
});

const withConnect = connect(
  mapStateToProps,
  { getCurrentUser, logoutUser, setAppLoaded },
);

const withSaga = injectSaga({ key: "appDaemons", saga, mode: DAEMON });

export default withRouter(withConnect(withSaga(App)));
