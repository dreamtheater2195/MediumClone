import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import coverImage from "assets/img/examples/city.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import settingPageStyle from "assets/jss/material-kit-pro-react/views/settingPageStyle";
import image from "assets/img/faces/avatar.jpg";
export class SettingPage extends Component {
  static propTypes = {
    classes: PropTypes.object,
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
          <title>Settings</title>
          <meta name="description" content="Setting page" />
        </Helmet>
        <Parallax
          image={coverImage}
          filter="dark"
          className={classes.parallax}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.contactContent}>
            <div className={classes.container}>
              <h2 className={classes.title}>Your profile</h2>
              <GridContainer>
                <GridItem md={6} sm={6}>
                  <form>
                    <CustomInput
                      labelText="Your username"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="Email address"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="URL of profile picture"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                    <CustomInput
                      labelText="Your bio"
                      id="float"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: "Tell us a little bit about yourself",
                        multiline: true,
                        rows: 6,
                      }}
                    />
                    <div className={classes.textCenter}>
                      <Button color="primary" round>
                        Update profile
                      </Button>
                    </div>
                  </form>
                </GridItem>
                <GridItem md={4} sm={4} className={classes.mlAuto}>
                  <h5 className={`${classes.title}`}>Profile picture</h5>
                  <img
                    src={image}
                    alt="..."
                    className={`${classes.imgRaised} ${classes.imgRounded} ${
                      classes.profilePicture
                    }`}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(settingPageStyle)(SettingPage);
