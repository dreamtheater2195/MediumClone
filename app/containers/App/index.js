import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import { DAEMON } from "utils/constants";
import injectSaga from "utils/injectSaga";
import API from "api";
import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import RegisterPage from "containers/RegisterPage";
import LoginPage from "containers/LoginPage";
import AppHeader from "./AppHeader";
import saga from "./sagas";

class App extends Component {
  async componentDidMount() {
    const token = await localStorage.getItem("jwt");
    if (token) {
      API.setToken(token);
    }
    // load app && set current user
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
        <AppHeader />
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

const withSaga = injectSaga({ key: "appDaemons", saga, mode: DAEMON });

export default withSaga(App);
