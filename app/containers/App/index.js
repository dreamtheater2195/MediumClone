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
import FeaturePage from "containers/FeaturePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import RegisterPage from "containers/RegisterPage/Loadable";
import LoginPage from "containers/LoginPage/Loadable";
import SettingPage from "containers/SettingPage/Loadable";
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
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
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
              <Route path="/settings" component={SettingPage} />
              <Route path="/features" component={FeaturePage} />
              <Route component={NotFoundPage} />
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
