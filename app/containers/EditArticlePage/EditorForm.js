import React from "react";
import PropTypes from "prop-types";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import marked from "marked";
import he from "he";
import hljs from "highlight.js";
const EditorForm = ({
  classes,
  title,
  description,
  body,
  onFieldChange,
  onSubmit,
  saving,
  showPreview,
  toggleShowPreview,
}) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer,
    breaks: true,
    highlight(code, lang) {
      if (!lang) {
        return hljs.highlightAuto(code).value;
      }
      return hljs.this.highlight(code, lang).value;
    },
  });
  const markedBody = marked(he.decode(body));
  return (
    <form>
      <CustomInput
        id="title"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: "Article title",
          value: title,
          onChange: onFieldChange("title"),
        }}
      />
      <CustomInput
        id="description"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          placeholder: "What's this article about?",
          value: description,
          onChange: onFieldChange("description"),
        }}
      />
      {showPreview ? (
        <div
          className={classes.markdownPreview}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: markedBody }}
        />
      ) : (
        <CustomInput
          id="body"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            placeholder: "Tell your story...",
            multiline: true,
            value: body,
            onChange: onFieldChange("body"),
            rows: 10,
          }}
        />
      )}
      <Button color="primary" round disabled={saving} onClick={onSubmit}>
        {saving ? "Saving..." : "Save Article"}
      </Button>
      {"  "}
      <Button color="info" round onClick={toggleShowPreview}>
        {showPreview ? "Show Editor" : "Show Preview"}
      </Button>
    </form>
  );
};

EditorForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  onFieldChange: PropTypes.func,
  onSubmit: PropTypes.func,
  saving: PropTypes.bool,
  classes: PropTypes.object,
  showPreview: PropTypes.bool,
  toggleShowPreview: PropTypes.func,
};
export default EditorForm;
