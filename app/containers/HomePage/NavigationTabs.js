import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/icons
import Public from "@material-ui/icons/Public";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
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
  };
  renderArticles() {
    const { classes, loading, articles } = this.props;
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
    return (
      <NavPills
        alignCenter
        color="primary"
        tabs={[
          {
            tabButton: "Your Feed",
            tabIcon: Person,
            tabContent: this.renderArticles(),
          },
          {
            tabButton: "Global Feed",
            tabIcon: Public,
            tabContent: (
              <span>
                <p>
                  Efficiently unleash cross-media information without
                  cross-media value. Quickly maximize timely deliverables for
                  real-time schemas.
                </p>
                <br />
                <p>
                  Dramatically maintain clicks-and-mortar solutions without
                  functional solutions. Dramatically visualize customer directed
                  convergence without revolutionary ROI. Collaboratively
                  administrate empowered markets via plug-and-play networks.
                  Dynamically procrastinate B2C users after installed base
                  benefits.
                </p>
              </span>
            ),
          },
          {
            tabButton: "#dragons",
            tabIcon: People,
            tabContent: (
              <span>
                <p>
                  Collaboratively administrate empowered markets via
                  plug-and-play networks. Dynamically procrastinate B2C users
                  after installed base benefits.
                </p>
                <br />
                <p>
                  Dramatically visualize customer directed convergence without
                  revolutionary ROI. Collaboratively administrate empowered
                  markets via plug-and-play networks. Dynamically procrastinate
                  B2C users after installed base benefits.
                </p>
                <br />
                <p>
                  Dramatically visualize customer directed convergence without
                  revolutionary ROI. Collaboratively administrate empowered
                  markets via plug-and-play networks. Dynamically procrastinate
                  B2C users after installed base benefits.
                </p>
              </span>
            ),
          },
        ]}
      />
    );
  }
}

export default NavigationTabs;
