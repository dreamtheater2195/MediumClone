import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header";
import Button from "components/CustomButtons/Button";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

const AppHeader = props => {
  const { classes, currentUser, onSignout, width } = props;
  const renderHeaderLinks = () => {
    if (currentUser) {
      return (
        <Fragment>
          <ListItem className={classes.listItem}>
            <Link to="/editor" className={classes.navLinkColor}>
              <Button className={classes.navLink} color="transparent">
                NEW ARTICLE
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              left
              caret={false}
              hoverColor="dark"
              dropdownHeader={currentUser.get("username")}
              buttonText={
                isWidthDown("sm", width) ? (
                  <div>
                    <img
                      src={currentUser.get("image")}
                      className={classes.img}
                      alt="profile"
                    />
                    {`  ${currentUser.get("username")}`}
                  </div>
                ) : currentUser.get("image") ? (
                  <img
                    src={currentUser.get("image")}
                    className={classes.img}
                    alt="profile"
                  />
                ) : (
                  currentUser.get("username")
                )
              }
              buttonProps={{
                className: `${classes.navLink} ${classes.imageDropdownButton} ${
                  classes.navLinkColor
                }`,
                color: "transparent",
              }}
              dropdownList={[
                <Link
                  to={`/profile/@${currentUser.get("username")}`}
                  className={classes.dropdownLinkColor}
                >
                  My Profile
                </Link>,
                <Link to="/settings" className={classes.dropdownLinkColor}>
                  Settings
                </Link>,
                <Link
                  to="/"
                  className={classes.dropdownLinkColor}
                  onClick={onSignout}
                >
                  Sign out
                </Link>,
              ]}
            />
          </ListItem>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <ListItem className={classes.listItem}>
          <Link to="/login" className={classes.navLinkColor}>
            <Button
              className={classes.navLink}
              color="transparent"
              style={{ color: "white" }}
            >
              Sign in
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/register" className={classes.navLinkColor}>
            <Button
              className={classes.navLink}
              color="transparent"
              style={{ color: "white" }}
            >
              Sign up
            </Button>
          </Link>
        </ListItem>
      </Fragment>
    );
  };
  return (
    <Header
      brand="Medium"
      absolute
      color="transparent"
      links={
        <List className={`${classes.list} ${classes.mlAuto}`}>
          <ListItem className={classes.listItem}>
            <Link to="/" className={classes.navLinkColor}>
              <Button className={classes.navLink} color="transparent">
                Home
              </Button>
            </Link>
          </ListItem>
          {renderHeaderLinks()}
        </List>
      }
    />
  );
};

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  onSignout: PropTypes.func.isRequired,
  width: PropTypes.number,
};
export default withStyles(headerLinksStyle)(withWidth()(AppHeader));
