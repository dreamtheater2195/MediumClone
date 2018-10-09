import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import repoListStyle from "assets/jss/material-kit-pro-react/views/homePageSections/repoListStyle";
import { FormattedMessage } from "react-intl";
import Table from "components/Table/Table";
import Button from "components/CustomButtons/Button";
import LoadingIndicator from "components/LoadingIndicator";
import messages from "../messages";

class SectionRepoList extends React.PureComponent {
  static propTypes = {
    reposListProps: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      repos: PropTypes.array,
    }),
    classes: PropTypes.object.isRequired,
    onSubmitForm: PropTypes.func,
    inputValue: PropTypes.string,
    onChangeInput: PropTypes.func,
  };
  renderReposList = () => {
    const { classes, reposListProps } = this.props;
    const { loading, error, repos } = reposListProps;
    if (loading) {
      return (
        <GridItem>
          <LoadingIndicator />
        </GridItem>
      );
    }
    if (error) {
      return (
        <GridItem>
          <h4 className={classes.title}>No repositories found</h4>
        </GridItem>
      );
    }
    if (repos) {
      return (
        <GridItem xs={12}>
          <h4>Repositories</h4>
          <Table
            tableHead={[
              "#",
              "Name",
              "Language",
              "Created Date",
              "Description",
              "Issues",
            ]}
            tableData={repos.map((repo, index) => {
              const {
                name,
                description,
                language,
                open_issues_count: openIssuesCount,
                created_at: createdAt,
              } = repo;
              return [
                index,
                name,
                language,
                moment(createdAt).format("MMM Do YY"),
                description,
                openIssuesCount,
              ];
            })}
            customHeadCellClasses={[
              classes.tdName,
              `${classes.tdDate} ${classes.textCenter}`,
              classes.description,
            ]}
            customHeadClassesForCells={[1, 3, 4]}
            customCellClasses={[
              classes.tdName,
              `${classes.tdDate} ${classes.textCenter}`,
              classes.description,
            ]}
            customClassesForCells={[1, 3, 4]}
          />
        </GridItem>
      );
    }
    return null;
  };

  render() {
    const { classes, onSubmitForm, inputValue, onChangeInput } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <h2 className={classes.title}>
            <FormattedMessage {...messages.githubHeader} />
          </h2>
          <GridContainer>
            <GridItem xs={6} className={classes.alignItemsCenter}>
              <CustomInput
                id="username"
                inputProps={{
                  placeholder: "@dreamtheater2195",
                  value: inputValue,
                  onChange: onChangeInput,
                }}
                formControlProps={{
                  fullWidth: true,
                }}
                labelText="Show Github repositories by"
              />
            </GridItem>
            <GridItem xs={2} className={classes.alignItemsCenter}>
              <Button color="primary" onClick={onSubmitForm}>
                Find
              </Button>
            </GridItem>
            {this.renderReposList()}
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(repoListStyle)(SectionRepoList);
