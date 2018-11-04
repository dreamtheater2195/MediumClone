import {
  container,
  title,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react";

const homePageStyle = {
  main: {
    ...main,
    /* overflow: "hidden" */
  },
  mainRaised,
  parallax: {
    height: "40vh",
    overflow: "hidden",
  },
  container: {
    ...container,
    zIndex: 1,
  },
  brand: {
    color: "#fff",
    textAlign: "center",
    "& h1": {
      fontSize: "4.2rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative",
    },
  },
  title: {
    ...title,
    color: "#FFF",
  },
  articleTitle: {
    ...title,
    marginTop: "10px",
    marginBottom: "10px",
  },
  textCenter: {
    textAlign: "center",
  },
  subtitle: {
    color: "#FFFFFF",
  },
  progress: {
    textAlign: "center",
    margin: "50px 0",
  },
  footerButtons: {
    float: "right",
  },
  articleTags: {
    float: "right",
  },
};

export default homePageStyle;
