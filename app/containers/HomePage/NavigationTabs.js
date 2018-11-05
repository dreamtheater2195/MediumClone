import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Public from "@material-ui/icons/Public";
import Person from "@material-ui/icons/Person";
// import People from "@material-ui/icons/People";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import NavPills from "components/NavPills/NavPills";
import Article from "./Article";
/* eslint-disable react/prefer-stateless-function */
class NavigationTabs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    articles: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    tab: PropTypes.string,
    onTabChange: PropTypes.func,
    onLikeArticle: PropTypes.func,
    onUnlikeArticle: PropTypes.func,
    token: PropTypes.string,
  };
  renderArticles(tab) {
    const {
      classes,
      loading,
      articles,
      tab: currentTab,
      onLikeArticle,
      onUnlikeArticle,
    } = this.props;
    if (tab !== currentTab) return null;
    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (articles) {
      return (
        <div>
          {articles.map((article, index) => (
            <Article
              article={article}
              classes={classes}
              key={index}
              likeArticle={onLikeArticle}
              unlikeArticle={onUnlikeArticle}
            />
          ))}
        </div>
      );
    }
    return null;
  }
  render() {
    const { onTabChange, token } = this.props;
    const tabs = [
      {
        tabButton: "Global Feed",
        tabIcon: Public,
        tabContent: this.renderArticles("all"),
      },
    ];
    if (token) {
      tabs.unshift({
        tabButton: "Your Feed",
        tabIcon: Person,
        tabContent: this.renderArticles("feed"),
      });
    }
    return (
      <NavPills
        alignCenter
        color="primary"
        onTabChange={onTabChange}
        tabs={tabs}
      />
    );
  }
}

export default NavigationTabs;
