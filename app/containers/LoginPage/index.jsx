import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Button from "components/CustomButtons/Button";

import image from "assets/img/bg7.jpg";
import SignInForm from "./SignInForm";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      errors: null,
    };
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  handleInputChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
    const { email, password } = this.state;
    this.validate({ email, password, [field]: event.target.value });
  };

  validate = values => {
    const errors = {};
    const requiredFields = ["email", "password"];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = "Required";
      }
    });

    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    this.setState({ errors });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
  };

  render() {
    const { classes } = this.props;
    const { password, email, errors } = this.state;
    console.log(this.state);
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

export default withStyles(loginPageStyle)(LoginPage);
