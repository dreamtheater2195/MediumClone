import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GridItem from "components/Grid/GridItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Articles from "containers/HomePage/Articles";

const ProfileTabs = ({
  articles,
  articlesLoading,
  articlesError,
  classes,
  likeArticle,
  unlikeArticle,
  onTabChange,
  currentTab,
}) => {
  const renderArticles = () => {
    if (articlesLoading) {
      return (
        <div className={classes.progress}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (articlesError) {
      return <h3>Cannot load your articles. Please try again.</h3>;
    }

    if (!articles || !articles.size) {
      return <h3>You have not published any article yet.</h3>;
    }
    return (
      <Articles
        articles={articles}
        classes={classes}
        likeArticle={likeArticle}
        unlikeArticle={unlikeArticle}
      />
    );
  };
  return (
    <GridItem xs={12} sm={10}>
      <Tabs value={currentTab} onChange={onTabChange}>
        <Tab label="Your articles" />
        <Tab label="Favorited articles" />
      </Tabs>
      {renderArticles()}
    </GridItem>
  );
};
ProfileTabs.propTypes = {
  articles: PropTypes.object,
  classes: PropTypes.object,
  likeArticle: PropTypes.func,
  unlikeArticle: PropTypes.func,
  onTabChange: PropTypes.func,
  articlesLoading: PropTypes.bool,
  articlesError: PropTypes.object,
  currentTab: PropTypes.number,
};
export default ProfileTabs;
