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
            <Button
              className={classes.navLink}
              onClick={e => e.preventDefault()}
              color="transparent"
            >
              <Link to="/new-post" style={{ color: "inherit" }}>
                NEW POST
              </Link>
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              left
              caret={false}
              hoverColor="dark"
              dropdownHeader={currentUser.username}
              buttonText={
                currentUser.image ? (
                  <img
                    src={currentUser.image}
                    className={classes.img}
                    alt="profile"
                  />
                ) : (
                  currentUser.username
                )
              }
              buttonProps={{
                className: `${classes.navLink} ${classes.imageDropdownButton}`,
                color: "transparent",
              }}
              dropdownList={[
                <Link to="/profile" style={{ color: "inherit" }}>
                  My Profile
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
          <Button
            className={classes.navLink}
            onClick={e => e.preventDefault()}
            color="transparent"
          >
            <Link to="/login" style={{ color: "inherit" }}>
              Sign in
            </Link>
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            className={classes.navLink}
            onClick={e => e.preventDefault()}
            color="transparent"
          >
            <Link to="/register" style={{ color: "inherit" }}>
              Sign up
            </Link>
          </Button>
        </ListItem>
      </Fragment>
    );
  };
  return (
    <Header
      brand="Conduit"
      absolute
      color="transparent"
      changeColorOnScroll={{
        height: 400,
        color: "primary",
      }}
      links={
        <List className={`${classes.list} ${classes.mlAuto}`}>
          <ListItem className={classes.listItem}>
            <Button
              className={`${classes.navLink} ${classes.navLinkActive}`}
              onClick={e => e.preventDefault()}
              color="transparent"
            >
              <Link to="/" style={{ color: "inherit" }}>
                Home
              </Link>
            </Button>
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
