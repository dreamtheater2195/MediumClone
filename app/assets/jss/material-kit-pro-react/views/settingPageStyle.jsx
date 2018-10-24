import {
  container,
  title,
  main,
  mainRaised,
  mlAuto,
  description,
} from "assets/jss/material-kit-pro-react";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles";

const style = {
  main,
  mainRaised,
  title,
  mlAuto,
  description,
  container: {
    ...container,
    maxWidth: "970px !important",
  },
  contactContent: {
    paddingBottom: "40px",
    paddingTop: "40px",
  },
  textCenter: {
    textAlign: "center !important",
  },
  parallax: {
    height: "380px",
    backgroundPosition: "top center",
  },
  ...imagesStyles,
  profilePicture: {
    height: "auto",
    width: "70%",
  },
};

export default style;
