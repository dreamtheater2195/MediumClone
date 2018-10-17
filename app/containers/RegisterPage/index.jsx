import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import image from "assets/img/bg7.jpg";
import registerPageStyle from "assets/jss/material-kit-pro-react/views/registerPageStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import Button from "components/CustomButtons/Button";
import SignUpForm from "./SignUpForm";

export class RegisterPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes } = this.props;

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
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={8} md={7}>
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
                        <SignUpForm classes={classes} />
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

export default withStyles(registerPageStyle)(RegisterPage);
