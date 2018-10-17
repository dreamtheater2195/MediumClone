import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header";
import Button from "components/CustomButtons/Button";
import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle";

const AppHeader = props => {
  const { classes } = props;
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
          <ListItem className={classes.listItem}>
            <Button
              className={classes.navLink}
              onClick={e => e.preventDefault()}
              color="transparent"
            >
              Sign in
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              className={classes.navLink}
              onClick={e => e.preventDefault()}
              color="transparent"
            >
              Sign up
            </Button>
          </ListItem>
        </List>
      }
    />
  );
};

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(headerLinksStyle)(AppHeader);
