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

const AppHeader = props => {
  const { classes, currentUser, onSignout } = props;
  const renderHeaderLinks = () => {
    if (currentUser) {
      return (
        <Fragment>
          <ListItem className={classes.listItem}>
            <Link to="/editor">
              <Button
                className={classes.navLink}
                color="transparent"
                style={{ color: "white" }}
              >
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
                currentUser.get("image") ? (
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
                className: `${classes.navLink} ${classes.imageDropdownButton}`,
                color: "transparent",
              }}
              dropdownList={[
                <Link
                  to={`/profile/@${currentUser.get("username")}`}
                  style={{ color: "inherit" }}
                >
                  My Profile
                </Link>,
                <Link to="/settings" style={{ color: "inherit" }}>
                  Settings
                </Link>,
                <Link to="/" style={{ color: "inherit" }} onClick={onSignout}>
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
          <Link to="/login">
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
          <Link to="/register">
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
      changeColorOnScroll={{
        height: 400,
        color: "primary",
      }}
      links={
        <List className={`${classes.list} ${classes.mlAuto}`}>
          <ListItem className={classes.listItem}>
            <Link to="/">
              <Button
                className={`${classes.navLink} ${classes.navLinkActive}`}
                color="transparent"
                style={{ color: "white" }}
              >
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
};
export default withStyles(headerLinksStyle)(AppHeader);
