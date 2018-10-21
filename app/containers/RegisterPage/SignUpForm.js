import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";

import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

const SignUpForm = ({
  classes,
  username,
  email,
  password,
  errors,
  onInputChange,
  onSubmit,
  loading,
}) => (
  <form className={classes.form}>
    <CustomInput
      id="username"
      labelText={errors && errors.username}
      error={!!errors && !!errors.username}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: username,
        onChange: onInputChange("username"),
        startAdornment: (
          <InputAdornment position="start" className={classes.inputAdornment}>
            <Face className={classes.inputAdornmentIcon} />
          </InputAdornment>
        ),
        placeholder: "User name...",
      }}
    />
    <CustomInput
      id="email"
      labelText={errors && errors.email}
      error={!!errors && !!errors.email}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.inputAdornment}>
            <Email className={classes.inputAdornmentIcon} />
          </InputAdornment>
        ),
        type: "email",
        value: email,
        onChange: onInputChange("email"),
        placeholder: "Email...",
      }}
    />
    <CustomInput
      id="pass"
      labelText={errors && errors.password}
      error={!!errors && !!errors.password}
      formControlProps={{
        fullWidth: true,
        className: classes.customFormControlClasses,
      }}
      inputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.inputAdornment}>
            <LockOutline className={classes.inputAdornmentIcon} />
          </InputAdornment>
        ),
        type: "password",
        value: password,
        onChange: onInputChange("password"),
        placeholder: "Password...",
      }}
    />
    <div className={classes.textCenter}>
      <Button round color="primary" onClick={onSubmit} disabled={loading}>
        Sign up
      </Button>
      <h5>
        Already have an account?
        <Link to="/login"> Click here to sign in.</Link>
      </h5>
    </div>
  </form>
);

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignUpForm;
