import React from "react";
import PropTypes from "prop-types";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
const EditorForm = ({
  title,
  description,
  body,
  onFieldChange,
  onSubmit,
  saving,
}) => (
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
        rows: 8,
      }}
    />
    <Button color="primary" round disabled={saving} onClick={onSubmit}>
      {saving ? "Saving..." : "Save Article"}
    </Button>
  </form>
);

EditorForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  onFieldChange: PropTypes.func,
  onSubmit: PropTypes.func,
  saving: PropTypes.bool,
};
export default EditorForm;
