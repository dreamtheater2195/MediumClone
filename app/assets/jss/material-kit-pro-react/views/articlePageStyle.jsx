import {
  container,
  title,
  main,
  mainRaised,
  cardTitle,
} from "assets/jss/material-kit-pro-react";

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
};

export default articlePageStyle;
