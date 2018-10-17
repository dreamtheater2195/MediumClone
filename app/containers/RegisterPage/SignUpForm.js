import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";

import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";

const SignUpForm = ({ classes }) => (
  <form className={classes.form}>
    <CustomInput
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.inputAdornment}>
            <Face className={classes.inputAdornmentIcon} />
          </InputAdornment>
        ),
        placeholder: "User name...",
      }}
    />
    <CustomInput
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.inputAdornment}>
            <Email className={classes.inputAdornmentIcon} />
          </InputAdornment>
        ),
        placeholder: "Email...",
      }}
    />
    <CustomInput
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
        placeholder: "Password...",
      }}
    />
    <div className={classes.textCenter}>
      <Button round color="primary">
        Sign up
      </Button>
    </div>
    <h5 className={classes.textCenter}>
      Already have an account?
      <Link to="/login"> Click here to sign in.</Link>
    </h5>
  </form>
);

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SignUpForm;
