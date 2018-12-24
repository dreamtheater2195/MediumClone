import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Public from "@material-ui/icons/Public";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import NavPills from "components/NavPills/NavPills";
import Articles from "./Articles";
/* eslint-disable react/prefer-stateless-function */
class NavigationTabs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    articles: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    tab: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    tag: PropTypes.string,
    onTabChange: PropTypes.func,
    onLikeArticle: PropTypes.func,
    onUnlikeArticle: PropTypes.func,
    token: PropTypes.string,
  };
  renderArticles(tab, tag) {
    const {
      classes,
      loading,
      articles,
      tab: currentTab,
      onLikeArticle,
      onUnlikeArticle,
    } = this.props;
    if (tab && currentTab && tab !== currentTab) return null;
    else if (tag && currentTab) return null;
    if (loading) {
      return (
        <div className={classes.progress}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (articles) {
      return (
        <Articles
          articles={articles}
          classes={classes}
          likeArticle={onLikeArticle}
          unlikeArticle={onUnlikeArticle}
        />
      );
    }
    return null;
  }
  render() {
    const { onTabChange, token, tag, tab } = this.props;
    let active = 0;
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
    if (tag) {
      tabs.push({
        tabButton: tag,
        tabIcon: People,
        tabContent: this.renderArticles(null, tag),
      });
    }

    if (token && tab === "all") active = 1;
    if (!tab) active = tabs.length - 1;

    return (
      <NavPills
        alignCenter
        color="primary"
        onTabChange={onTabChange}
        tabs={tabs}
        active={active}
      />
    );
  }
}

export default NavigationTabs;
