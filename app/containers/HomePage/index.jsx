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
import Paginations from "components/Pagination/Pagination";
import Badge from "components/Badge/Badge";
import homePageStyle from "assets/jss/material-kit-pro-react/views/homePageStyle";
import reducer from "./reducer";
import saga from "./saga";
import {
  makeSelectArticles,
  makeSelectLoading,
  makeSelectTags,
  makeSelectCurrentPage,
  makeSelectTab,
  makeSelectArticlesCount,
  makeSelectCurrentTag,
} from "./selectors";
import { makeSelectToken } from "./../App/selectors";
import {
  loadArticles,
  loadArticlesWithTag,
  loadPopularTags,
  likeArticle,
  unlikeArticle,
} from "./actions";
import NavigationTabs from "./NavigationTabs";
import coverImage from "../../assets/img/bg10.jpg";
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    const tab = this.props.token ? "feed" : "all";
    this.props.loadArticles(tab);
    this.props.loadPopularTags();
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      const tab = this.props.token ? "feed" : "all";
      this.props.loadArticles(tab);
    }
  }

  handleTabChange(index) {
    const { token, tag } = this.props;
    switch (index) {
      case 0:
        if (token) {
          this.props.loadArticles("feed");
        } else {
          this.props.loadArticles("all");
        }
        break;
      case 1:
        if (token) {
          this.props.loadArticles("all");
        } else {
          this.props.loadArticlesWithTag(tag);
        }
        break;
      case 2:
        this.props.loadArticlesWithTag(this.props.tag);
        break;
      default:
        break;
    }
  }

  makeHandleTagSelect = tag => () => {
    this.props.loadArticlesWithTag(tag);
  };

  makeHandlePageChange = page => () => {
    if (this.props.currentPage === page) return;
    this.props.loadArticles(this.props.tab, page);
  };
  render() {
    const {
      classes,
      loading,
      articles,
      tags,
      tag: currentTag,
      currentPage,
      tab,
      token,
      articlesCount,
    } = this.props;

    const perPage = 10;
    const pages = [];
    for (let i = 0; i < Math.ceil(articlesCount / perPage); i += 1) {
      pages.push({
        text: i + 1,
        active: i === currentPage,
        onClick: this.makeHandlePageChange(i),
      });
    }
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
                currentPage={currentPage}
                tab={tab}
                tag={currentTag}
                onTabChange={this.handleTabChange}
                token={token}
                onLikeArticle={this.props.likeArticle}
                onUnlikeArticle={this.props.unlikeArticle}
              />
              <Paginations pages={pages} color="danger" />
            </GridItem>
            <GridItem xs={12} sm={3}>
              <h4 className={classes.tagTitle}>Popular Tags</h4>
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  tabIndex={i}
                  onClick={this.makeHandleTagSelect(tag)}
                  className={classes.tag}
                >
                  {tag}
                </Badge>
              ))}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  loadArticles: PropTypes.func.isRequired,
  loadArticlesWithTag: PropTypes.func.isRequired,
  loadPopularTags: PropTypes.func.isRequired,
  likeArticle: PropTypes.func.isRequired,
  unlikeArticle: PropTypes.func.isRequired,
  articles: PropTypes.object,
  tags: PropTypes.object,
  tag: PropTypes.string,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  tab: PropTypes.string,
  token: PropTypes.string,
  articlesCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  articles: makeSelectArticles(),
  loading: makeSelectLoading(),
  tags: makeSelectTags(),
  currentPage: makeSelectCurrentPage(),
  tab: makeSelectTab(),
  token: makeSelectToken(),
  articlesCount: makeSelectArticlesCount(),
  tag: makeSelectCurrentTag(),
});

const withConnect = connect(
  mapStateToProps,
  {
    loadArticles,
    loadArticlesWithTag,
    loadPopularTags,
    likeArticle,
    unlikeArticle,
  },
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
