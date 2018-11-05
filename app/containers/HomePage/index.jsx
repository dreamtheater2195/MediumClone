/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Badge from "components/Badge/Badge";
import homePageStyle from "assets/jss/material-kit-pro-react/views/homePageStyle";
import reducer from "./reducer";
import saga from "./saga";
import {
  makeSelectArticles,
  makeSelectLoading,
  makeSelectTags,
} from "./selectors";
import { loadGlobalArticles, loadPopularTags } from "./actions";
import NavigationTabs from "./NavigationTabs";
import coverImage from "../../assets/img/bg10.jpg";
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  componentDidMount() {
    this.props.loadGlobalArticles();
    this.props.loadPopularTags();
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, loading, articles, tags } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="application homepage" />
        </Helmet>
        <Parallax
          image={coverImage}
          className={classes.parallax}
          filter="dark"
          small
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem md={8} className={classes.textCenter}>
                <h2 className={classes.title}>
                  A Place for Entrepreneurs to Share and Discover New Stories
                </h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div
          className={classNames(
            classes.container,
            classes.main,
            classes.mainRaised,
          )}
        >
          <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
              <NavigationTabs
                classes={classes}
                loading={loading}
                articles={articles}
              />
            </GridItem>
            <GridItem xs={12} sm={3}>
              <h4 className={classes.tagTitle}>Popular Tags</h4>
              {tags.map((tag, i) => <Badge key={i}>{tag}</Badge>)}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  loadGlobalArticles: PropTypes.func.isRequired,
  loadPopularTags: PropTypes.func.isRequired,
  articles: PropTypes.object,
  tags: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  articles: makeSelectArticles(),
  loading: makeSelectLoading(),
  tags: makeSelectTags(),
});

const withConnect = connect(
  mapStateToProps,
  { loadGlobalArticles, loadPopularTags },
);
const withReducer = injectReducer({ key: "articlesList", reducer });
const withSaga = injectSaga({ key: "articlesList", saga });
const withStyle = withStyles(homePageStyle);
export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyle,
)(HomePage);
