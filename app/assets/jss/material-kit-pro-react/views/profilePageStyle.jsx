import {
  container,
  title,
  main,
  mainRaised,
} from "assets/jss/material-kit-pro-react";

import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle";

const styles = {
  container,
  ...imagesStyle,
  ...tooltipsStyle,
  main,
  mainRaised,
  parallax: {
    height: "380px",
    backgroundPosition: "center",
  },
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      height: "auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  title,
  name: {
    marginTop: "-80px",
  },
  description: {
    margin: "1.071rem auto 0",
  },
  follow: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  followButton: {
    marginTop: "-28px",
  },
  followIcon: {
    width: "20px",
    height: "20px",
  },
  progress: {
    textAlign: "center",
    margin: "50px 0",
  },
};

export default styles;
