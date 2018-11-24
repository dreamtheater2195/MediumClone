import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Reply from "@material-ui/icons/Reply";
import Favorite from "@material-ui/icons/Favorite";
import Delete from "@material-ui/icons/Delete";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Media from "components/Media/Media";
import Button from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";

import profile6 from "assets/img/faces/card-profile6-square.jpg";
import moment from "moment";
/* eslint-disable react/prefer-stateless-function */
class ArticleComments extends Component {
  static propTypes = {
    classes: PropTypes.object,
    comments: PropTypes.object,
    currentUser: PropTypes.object,
  };
  render() {
    const { classes, comments, currentUser } = this.props;
    return (
      <div className={classes.commentsSection}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={8}>
            <div>
              {comments.size > 0 && (
                <h3 className={classes.commentsTitle}>
                  {comments.size} Comments
                </h3>
              )}
              {comments.map(comment => (
                <Media
                  key={comment.get("id")}
                  avatar={comment.getIn(["author", "image"])}
                  title={
                    <span>
                      {comment.getIn(["author", "username"])}{" "}
                      <small>
                        · {moment(comment.get("createdAt")).fromNow()}
                      </small>
                    </span>
                  }
                  body={
                    <p className={classes.color555}>{comment.get("body")}</p>
                  }
                  footer={
                    <div>
                      <Tooltip
                        id="tooltip-tina"
                        title="Reply to comment"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button
                          color="primary"
                          simple
                          className={classes.footerButtons}
                        >
                          <Reply className={classes.footerIcons} /> Reply
                        </Button>
                      </Tooltip>

                      <Button
                        color="danger"
                        simple
                        className={classes.footerButtons}
                      >
                        <Favorite className={classes.footerIcons} /> 243
                      </Button>

                      <Button
                        color="rose"
                        simple
                        className={classes.footerButtons}
                      >
                        <Delete className={classes.footerIcons} /> Delete
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
            {currentUser && (
              <Fragment>
                <h3 className={classes.commentsTitle}>Post your comment</h3>
                <Media
                  avatar={profile6}
                  body={
                    <CustomInput
                      labelText=" Write some nice stuff or nothing..."
                      id="nice"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  }
                  footer={
                    <Button
                      color="primary"
                      round
                      className={classes.footerButtons}
                    >
                      Post comment
                    </Button>
                  }
                />
              </Fragment>
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default ArticleComments;
