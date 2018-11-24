import {
  container,
  title,
  main,
  mainRaised,
  cardTitle,
} from "assets/jss/material-kit-pro-react";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle";

const articlePageStyle = {
  container: {
    ...container,
    zIndex: "2",
  },
  parallax: {
    height: "600px",
    overflow: "hidden",
  },
  title: {
    ...title,
    color: "#FFFFFF",
  },
  subtitle: {
    color: "#FFFFFF",
  },
  main,
  mainRaised,
  textCenter: {
    textAlign: "center",
  },
  progress: {
    textAlign: "center",
    padding: "50px 0",
  },
  section: {
    paddingBottom: "0",
    padding: "70px 0",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: "#555",
      marginBottom: "30px",
    },
  },
  articleTitle: {
    ...title,
  },
  blogTags: {
    marginTop: "8px",
  },
  card: {
    marginTop: "0",
    textAlign: "left",
  },
  cardTitle,
  bio: {
    fontSize: "1rem",
    color: "#999",
  },
  pullRight: {
    marginTop: "25px",
    float: "right",
  },
  favoriteButton: {
    float: "right",
  },
  ...tooltipsStyle,
  commentsSection: {
    backgroundposition: "50%",
    backgroundSize: "cover",
    padding: "70px 0",
  },
  commentsTitle: {
    ...title,
    marginBottom: "30px",
    textAlign: "center",
  },
  footerButtons: {
    float: "right",
  },
  footerIcons: {
    width: "1.1rem",
    height: "1.1rem",
    position: "relative",
    display: "inline-block",
    top: "0",
    marginTop: "-1em",
    marginBottom: "-1em",
    marginRight: "3px",
    verticalAlign: "middle",
  },
  color555: {
    "&,& *": {
      color: "#555 !important",
    },
  },
};

export default articlePageStyle;
