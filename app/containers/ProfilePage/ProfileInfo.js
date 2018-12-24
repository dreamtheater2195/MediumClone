import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "components/CustomButtons/Button";
import Settings from "@material-ui/icons/Settings";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";

const ProfileInfo = ({
  classes,
  profile,
  isCurrentUser,
  history,
  unfollow,
  follow,
}) => (
  <div className={classes.profile}>
    <div>
      <img
        src={profile.get("image")}
        alt="..."
        className={classNames(
          classes.imgRaised,
          classes.imgRoundedCircle,
          classes.imgFluid,
        )}
      />
    </div>
    <div className={classes.name}>
      <h3 className={classes.title}>{profile.get("username")}</h3>
    </div>
    {isCurrentUser ? (
      <div className={classes.follow}>
        <Tooltip
          id="tooltip-top"
          title="Edit your profile"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            justIcon
            round
            color="rose"
            className={classes.followButton}
            onClick={() => history.push("/settings")}
          >
            <Settings className={classes.followIcon} />
          </Button>
        </Tooltip>
      </div>
    ) : (
      <div className={classes.follow}>
        <Tooltip
          id="tooltip-top"
          title={`${
            profile.get("following") ? "Unfollow" : "Follow"
          } this user`}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            justIcon
            round
            color="primary"
            className={classes.followButton}
            onClick={() =>
              profile.get("following")
                ? unfollow(profile.get("username"))
                : follow(profile.get("username"))
            }
          >
            {profile.get("following") ? (
              <Clear className={classes.followIcon} />
            ) : (
              <Add className={classes.followIcon} />
            )}
          </Button>
        </Tooltip>
      </div>
    )}
    <div className={classes.description}>
      <p>{profile.get("bio")}</p>
    </div>
  </div>
);

ProfileInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  isCurrentUser: PropTypes.bool,
  history: PropTypes.object,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
};

export default ProfileInfo;
