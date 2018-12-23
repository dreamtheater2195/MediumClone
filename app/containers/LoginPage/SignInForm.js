import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";

import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

const SignInForm = ({
  classes,
  email,
  password,
  errors,
  onInputChange,
  onSubmit,
  loading,
}) => (
  <form className={classes.form}>
    <CustomInput
      id="email"
      labelText={errors && errors.email}
      error={!!errors && !!errors.email}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        placeholder: "Email...",
        type: "email",
        value: email,
        onChange: onInputChange("email"),
        startAdornment: (
          <InputAdornment position="start">
            <Email className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
    <CustomInput
      id="pass"
      labelText={errors && errors.password}
      error={!!errors && !!errors.password}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        placeholder: "Password",
        type: "password",
        value: password,
        onChange: onInputChange("password"),
        startAdornment: (
          <InputAdornment position="start">
            <LockOutline className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
    <div className={classes.textCenter}>
      <Button round color="primary" onClick={onSubmit} disabled={loading}>
        Sign in
      </Button>
      <h5>
        Are you new?
        <Link to="/register"> Create an account.</Link>
      </h5>
    </div>
  </form>
);

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

export default SignInForm;
