import {
  container,
  title,
  main,
  mainRaised
} from "assets/jss/material-kit-pro-react.jsx";

const homePageStyle = {
  main: {
    ...main
    /*overflow: "hidden"*/
  },
  mainRaised,
  parallax: {
    height: "90vh",
    overflow: "hidden"
  },
  container: {
    ...container,
    zIndex: 1
  },
  brand: {
    color: "#fff",
    textAlign: "center",
    "& h1": {
      fontSize: "4.2rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative"
    }
  },
  title: {
    ...title,
    color: "#FFF"
  },
  textCenter: {
    textAlign: "center"
  },
  subtitle: {
    color: "#FFFFFF"
  },
}

export default homePageStyle;
