/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from "containers/App/selectors";

import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import homePageStyle from "assets/jss/material-kit-pro-react/views/homePageStyle";

import SectionRepoList from "./Sections/SectionRepoList";
import messages from "./messages";
import { loadRepos } from "../App/actions";
import { changeUsername } from "./actions";
import { makeSelectUsername } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import coverImage from "../../assets/img/bg2.jpg";
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { loading, error, repos, classes } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>

        <Header
          brand="React Boilerplate"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "primary",
          }}
        />
        <Parallax image={coverImage} className={classes.parallax}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem md={8} className={classes.textCenter}>
                <h1 className={classes.title}>
                  <FormattedMessage {...messages.startProjectHeader} />
                </h1>
                <h4 className={classes.subtitle}>
                  <FormattedMessage {...messages.startProjectMessage} />
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionRepoList
            onSubmitForm={this.props.onSubmitForm}
            inputValue={this.props.username}
            onChangeInput={this.props.onChangeUsername}
            reposListProps={reposListProps}
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: () => {
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: "home", reducer });
const withSaga = injectSaga({ key: "home", saga });
const withStyle = withStyles(homePageStyle);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(HomePage);
