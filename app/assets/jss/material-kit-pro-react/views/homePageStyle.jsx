import {
  container,
  title,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react";

const homePageStyle = {
  main,
  mainRaised,
  parallax: {
    height: "65vh",
    overflow: "hidden",
  },
  container: {
    ...container,
    "@media (min-width: 1200px)": {
      maxWidth: "80%",
    },
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

  tagTitle: {
    ...title,
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
  tag: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#899097",
    },
  },
  articleTitle: {
    ...title,
    marginTop: "10px",
    marginBottom: "10px",
  },
  footerButtons: {
    float: "right",
  },
  articleTags: {
    float: "right",
  },
};
export default homePageStyle;
