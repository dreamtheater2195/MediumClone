import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import image from "assets/img/bg7.jpg";
import registerPageStyle from "assets/jss/material-kit-pro-react/views/registerPageStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import Button from "components/CustomButtons/Button";
import {
  makeSelectAuth,
  makeSelectCurrentUser,
} from "containers/App/selectors";
import { registerUser, changeAuthField } from "containers/App/actions";
import SignUpForm from "./SignUpForm";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
    };
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    changeAuthField: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors) {
      const nextState = {
        ...this.state,
      };
      const {
        auth: { errors },
      } = nextProps;

      if (nextProps.auth.errors.email) {
        nextState.errors.email = `email ${errors.email[0]}`;
      }
      if (nextProps.auth.errors.password) {
        nextState.errors.password = `password ${errors.password[0]}`;
      }
      if (nextProps.auth.errors.username) {
        nextState.errors.username = `username ${errors.username[0]}`;
      }

      this.setState(nextState);
    } else if (nextProps.currentUser) {
      this.props.history.push("/"); // eslint-disable-line
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  handleInputChange = field => event => {
    this.props.changeAuthField({ field, value: event.target.value });
  };

  validate = values => {
    let valid = true;
    const errors = {};
    const requiredFields = ["username", "email", "password"];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = "Required";
        valid = false;
      }
    });

    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
      valid = false;
    }
    this.setState({ errors });
    return valid;
  };

  handleSubmit = () => {
    if (!this.validate(this.props.auth)) return;
    const {
      auth: { username, email, password },
    } = this.props;
    this.props.registerUser({ username, email, password });
  };

  render() {
    const {
      classes,
      auth: { username, password, email, loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Sign up page" />
        </Helmet>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={10} sm={8} md={8}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={10} sm={10} md={8}>
                        <div className={classes.textCenter}>
                          <Button justIcon round color="google">
                            <i className={`${classes.socials} fab fa-google`} />
                          </Button>
                          {` `}
                          <Button justIcon round color="github">
                            <i className={`${classes.socials} fab fa-github`} />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook">
                            <i
                              className={`${classes.socials} fab fa-facebook-f`}
                            />
                          </Button>
                          {` `}
                          <h4 className={classes.socialTitle}>
                            or be classical
                          </h4>
                        </div>
                        <SignUpForm
                          classes={classes}
                          username={username}
                          password={password}
                          email={email}
                          onInputChange={this.handleInputChange}
                          errors={errors}
                          onSubmit={this.handleSubmit}
                          loading={loading}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  currentUser: makeSelectCurrentUser(),
});
export default withStyles(registerPageStyle)(
  connect(
    mapStateToProps,
    { registerUser, changeAuthField },
  )(RegisterPage),
);
