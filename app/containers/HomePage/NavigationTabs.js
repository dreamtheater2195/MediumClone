import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/icons
import Public from "@material-ui/icons/Public";
import Person from "@material-ui/icons/Person";
// import People from "@material-ui/icons/People";
import Favorite from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import Clearfix from "components/Clearfix/Clearfix";
import NavPills from "components/NavPills/NavPills";
import Media from "components/Media/Media";
import Button from "components/CustomButtons/Button";
import Badge from "components/Badge/Badge";
import Muted from "components/Typography/Muted";
import moment from "moment";
/* eslint-disable react/prefer-stateless-function */
class NavigationTabs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    articles: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    tab: PropTypes.string,
    onTabChange: PropTypes.func,
    token: PropTypes.string,
  };
  renderArticles(tab) {
    const { classes, loading, articles, tab: currentTab } = this.props;
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
            <Media
              key={index}
              avatar={article.get("author").get("image")}
              avatarAlt={article.get("author").get("username")}
              title={
                <span>
                  <Link
                    to={`/profile/@${article.get("author").get("username")}`}
                  >
                    {article.get("author").get("username")}
                  </Link>{" "}
                  <small>
                    · {moment(article.get("createdAt")).format("lll")}
                  </small>
                </span>
              }
              body={
                <div>
                  <div style={{ float: "left", maxWidth: "60%" }}>
                    <h4 className={classes.articleTitle}>
                      {article.get("title")}
                    </h4>
                    <h5>{article.get("description")}</h5>
                  </div>
                  <Button
                    color="danger"
                    simple={!article.get("favorited")}
                    size="sm"
                    round
                    className={classes.footerButtons}
                  >
                    <Favorite />
                    {article.get("favoritesCount")}
                  </Button>
                </div>
              }
              footer={
                <div>
                  <Clearfix />
                  <Muted>Read more...</Muted>
                  <div className={classes.articleTags}>
                    {article
                      .get("tagList")
                      .map((tag, i) => <Badge key={i}>{tag}</Badge>)}
                  </div>
                  <Clearfix />
                  <hr />
                </div>
              }
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
