/**
 *
 * ArticlePage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectArticlePage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

/* eslint-disable react/prefer-stateless-function */
export class ArticlePage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ArticlePage</title>
          <meta name="description" content="Description of ArticlePage" />
        </Helmet>
        <h2>Article Page</h2>
      </div>
    );
  }
}

ArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired, // eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  articlepage: makeSelectArticlePage(),
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

const withReducer = injectReducer({ key: "article", reducer });
const withSaga = injectSaga({ key: "article", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticlePage);
