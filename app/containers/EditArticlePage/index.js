import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import withAuth from "utils/withAuth";
import classNames from "classnames";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import CircularProgress from "@material-ui/core/CircularProgress";
import { compose } from "redux";
import Parallax from "components/Parallax/Parallax";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import editArticlePageStyle from "assets/jss/material-kit-pro-react/views/editArticlePageStyle";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import coverImage from "assets/img/examples/card-blog2.jpg";
import { loadEditor, updateField, submitArticle } from "./actions";
import { makeSelectEditor } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import EditorForm from "./EditorForm";
/* eslint-disable react/prefer-stateless-function */
export class EditArticlePage extends React.Component {
  state = {
    showPreview: false,
  };

  componentDidMount() {
    if (this.props.match.params.slug) {
      return this.props.loadEditor(this.props.match.params.slug);
    }
    return this.props.loadEditor(null);
  }

  handleFieldChange = field => event =>
    this.props.updateField(field, event.target.value);

  handleSubmit = () => {
    const { editor } = this.props;
    const article = {
      slug: editor.get("articleSlug"),
      title: editor.get("title"),
      body: editor.get("body"),
      description: editor.get("description"),
    };
    this.props.submitArticle(article);
  };

  toggleShowPreview = () => {
    this.setState(prevState => ({
      showPreview: !prevState.showPreview,
    }));
  };

  render() {
    const { classes, editor } = this.props;
    return (
      <div>
        <Helmet>
          <title>EditArticlePage</title>
          <meta name="description" content="Description of EditArticlePage" />
        </Helmet>
        <Parallax
          image={coverImage}
          className={classes.parallax}
          filter="dark"
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <h2 className={classes.title}>
                  {this.props.match.params.slug
                    ? "Edit Article"
                    : "New Article"}
                </h2>
                {editor.get("loading") ? (
                  <div className={classes.progress}>
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <EditorForm
                    title={editor.get("title")}
                    body={editor.get("body")}
                    description={editor.get("description")}
                    onFieldChange={this.handleFieldChange}
                    saving={editor.get("saving")}
                    onSubmit={this.handleSubmit}
                    classes={classes}
                    showPreview={this.state.showPreview}
                    toggleShowPreview={this.toggleShowPreview}
                  />
                )}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

EditArticlePage.propTypes = {
  // currentUser: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  editor: PropTypes.object,
  loadEditor: PropTypes.func,
  updateField: PropTypes.func,
  submitArticle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  editor: makeSelectEditor(),
});

const withConnect = connect(
  mapStateToProps,
  { loadEditor, updateField, submitArticle },
);

const withReducer = injectReducer({ key: "editor", reducer });
const withSaga = injectSaga({ key: "editor", saga });
const withStyle = withStyles(editArticlePageStyle);
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
  withAuth,
)(EditArticlePage);
