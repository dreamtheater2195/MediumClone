import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import toastr from "toastr";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Button from "components/CustomButtons/Button";
import {
  makeSelectAuth,
  makeSelectCurrentUser,
} from "containers/App/selectors";
import { changeAuthField, loginUser } from "containers/App/actions";
import image from "assets/img/bg7.jpg";
import SignInForm from "./SignInForm";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
    };
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changeAuthField: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    loginUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.history.push("/"); // eslint-disable-line
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors) {
      toastr.error("Email or password is invalid");
    } else if (nextProps.currentUser) {
      toastr.success("Sign in successfully!");
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
    const requiredFields = ["email", "password"];
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
      auth: { email, password },
    } = this.props;
    this.props.loginUser({ email, password });
  };

  render() {
    const {
      classes,
      auth: { email, password, loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Helmet>
          <title>Sign in</title>
          <meta name="description" content="Sign in page" />
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
              <GridItem xs={12} sm={12} md={5}>
                <Card>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-github" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button
                        justIcon
                        color="transparent"
                        className={classes.iconButtons}
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fab fa-google-plus-g" />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={`${classes.description} ${classes.textCenter}`}>
                    Or Be Classical
                  </p>
                  <CardBody signup>
                    <SignInForm
                      classes={classes}
                      password={password}
                      email={email}
                      onInputChange={this.handleInputChange}
                      errors={errors}
                      onSubmit={this.handleSubmit}
                      loading={loading}
                    />
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

const withStyle = withStyles(loginPageStyle);
const withConnect = connect(
  mapStateToProps,
  { loginUser, changeAuthField },
);

export default compose(
  withStyle,
  withConnect,
)(LoginPage);
