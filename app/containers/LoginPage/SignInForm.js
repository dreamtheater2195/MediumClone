import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";

import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

const SignInForm = ({ classes }) => (
  <form className={classes.form}>
    <CustomInput
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        placeholder: "Email...",
        type: "email",
        startAdornment: (
          <InputAdornment position="start">
            <Email className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
    <CustomInput
      id="pass"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        placeholder: "Password",
        type: "password",
        startAdornment: (
          <InputAdornment position="start">
            <LockOutline className={classes.inputIconsColor} />
          </InputAdornment>
        ),
      }}
    />
    <div className={classes.textCenter}>
      <Button round color="primary">
        Sign in
      </Button>
      <h5>
        New to conduit?
        <Link to="/register"> Create an account.</Link>
      </h5>
    </div>
  </form>
);

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SignInForm;
