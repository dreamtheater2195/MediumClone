import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { DAEMON } from "utils/constants";
import injectSaga from "utils/injectSaga";
import API from "api";
import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import RegisterPage from "containers/RegisterPage";
import LoginPage from "containers/LoginPage";
import { getCurrentUser } from "containers/App/actions";
import { makeSelectCurrentUser } from "containers/App/selectors";
import AppHeader from "./AppHeader";
import saga from "./sagas";

class App extends Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
  };
  async componentDidMount() {
    const token = await localStorage.getItem("jwt");
    if (token) {
      API.setToken(token);
    }
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
        <AppHeader currentUser={this.props.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  { getCurrentUser },
);

const withSaga = injectSaga({ key: "appDaemons", saga, mode: DAEMON });

export default withConnect(withSaga(App));
