/**
 *
 * EditArticlePage
 *
 */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import withAuth from "utils/withAuth";
import classNames from "classnames";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import editArticlePageStyle from "assets/jss/material-kit-pro-react/views/editArticlePageStyle";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import coverImage from "assets/img/examples/card-blog2.jpg";
import { makeSelectEditor } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

/* eslint-disable react/prefer-stateless-function */
export class EditArticlePage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>EditArticlePage</title>
          <meta name="description" content="Description of EditArticlePage" />
        </Helmet>
        <Parallax
          image={coverImage}
          className={classes.parallax}
          filter="dark"
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes.title}>Edit Article</h2>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

EditArticlePage.propTypes = {
  // currentUser: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editor: makeSelectEditor(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: "editor", reducer });
const withSaga = injectSaga({ key: "editor", saga });
const withStyle = withStyles(editArticlePageStyle);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
  withAuth,
)(EditArticlePage);
