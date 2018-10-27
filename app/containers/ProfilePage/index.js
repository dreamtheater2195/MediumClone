/**
 *
 * ProfilePage
 *
 */

import React from "react";
import PropTypes from "prop-types"; //eslint-disable-line
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectProfilePage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  render() {
    return <h2>Profile Page</h2>;
  }
}

ProfilePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage(),
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

const withReducer = injectReducer({ key: "profilePage", reducer });
const withSaga = injectSaga({ key: "profilePage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
