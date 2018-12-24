import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser } from "containers/App/selectors";
export default ChildComponent => {
  class WrappedComponent extends Component {
    static propTypes = {
      currentUser: PropTypes.object,
      history: PropTypes.object.isRequired,
    };

    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.currentUser) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
  });

  return connect(mapStateToProps)(WrappedComponent);
};
