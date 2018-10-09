import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { mount } from "enzyme";
// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: PropTypes.shape({}) },
});

export function mountWrap(node) {
  return mount(node, createContext());
}
