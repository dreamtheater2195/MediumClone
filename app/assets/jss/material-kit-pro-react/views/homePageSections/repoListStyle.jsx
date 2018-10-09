import {
  container,
  section,
  title
} from "assets/jss/material-kit-pro-react.jsx";

const repoListStyle = {
  container,
  section: {
    ...section,
    paddingBottom: "40px",
    paddingTop: "40px"
  },
  title,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  description: {
    maxWidth: "300px",
    minWidth: "150px"
  },
  tdName: {
    minWidth: "200px"
  },
  tdDate: {
    minWidth: "100px"
  },
  alignItemsCenter: {
    display: "flex",
    alignItems: "center"
  },
  formControl: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    margin: "0px !important"
  },
}

export default repoListStyle;
