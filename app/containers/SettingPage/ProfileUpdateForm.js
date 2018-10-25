import React from "react";
import PropTypes from "prop-types";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";

const ProfileUpdateForm = ({ classes, user }) => (
  <form>
    <CustomInput
      labelText="Your username"
      id="username"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: user.username,
      }}
    />
    <CustomInput
      labelText="Email address"
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: user.email,
      }}
    />
    <CustomInput
      labelText="URL of profile picture"
      id="image"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: user.image,
      }}
    />
    <CustomInput
      labelText="Your bio"
      id="bio"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        placeholder: "Tell us a little bit about yourself",
        multiline: true,
        value: user.bio,
        rows: 6,
      }}
    />
    <div className={classes.textCenter}>
      <Button color="primary" round>
        Update profile
      </Button>
    </div>
  </form>
);

ProfileUpdateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
  }),
};

export default ProfileUpdateForm;
