/**
 *
 * Asynchronously loads the component for EditArticlePage
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null,
});
