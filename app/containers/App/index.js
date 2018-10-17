import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import RegisterPage from "containers/RegisterPage";
import AppHeader from "components/Header/AppHeader";

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}
