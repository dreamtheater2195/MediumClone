import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Public from "@material-ui/icons/Public";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";

import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import NavPills from "components/NavPills/NavPills";

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
            <div key={index}>
              <h2>{article.get("title")}</h2>
              <p>{article.get("body")}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={8}>
          <NavPills
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
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                    </p>
                    <br />
                    <p>
                      Dramatically maintain clicks-and-mortar solutions without
                      functional solutions. Dramatically visualize customer
                      directed convergence without revolutionary ROI.
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
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
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                    </p>
                    <br />
                    <p>
                      Dramatically visualize customer directed convergence
                      without revolutionary ROI. Collaboratively administrate
                      empowered markets via plug-and-play networks. Dynamically
                      procrastinate B2C users after installed base benefits.
                    </p>
                    <br />
                    <p>
                      Dramatically visualize customer directed convergence
                      without revolutionary ROI. Collaboratively administrate
                      empowered markets via plug-and-play networks. Dynamically
                      procrastinate B2C users after installed base benefits.
                    </p>
                  </span>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default NavigationTabs;
