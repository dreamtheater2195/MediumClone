import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import repoListStyle from "assets/jss/material-kit-pro-react/views/homePageSections/repoListStyle.jsx";
import { FormattedMessage } from 'react-intl';
import messages from '../messages.js';
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import LoadingIndicator from 'components/LoadingIndicator';
import moment from "moment";
class SectionRepoList extends React.PureComponent {
  renderReposList = () => {
    const { classes, reposListProps } = this.props;
    const { loading, error, repos } = reposListProps;
    if (loading) {
      return (
        <GridItem>
          <LoadingIndicator />
        </GridItem>
      )
    }
    if (error) {
      return (
        <GridItem>
          <h4 className={classes.title}>No repositories found</h4>
        </GridItem>
      )
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
              "Issues"
            ]}
            tableData={repos.map((repo, index) => {
              const { name, description, language, open_issues_count, created_at } = repo;
              return [
                index,
                name,
                language,
                moment(created_at).format("MMM Do YY"),
                description,
                open_issues_count
              ]
            })}
            customHeadCellClasses={[
              classes.tdName,
              classes.tdDate + " " + classes.textCenter,
              classes.description
            ]}
            customHeadClassesForCells={[
              1, 3, 4
            ]}
            customCellClasses={[
              classes.tdName,
              classes.tdDate + " " + classes.textCenter,
              classes.description
            ]}
            customClassesForCells={[
              1, 3, 4
            ]}
          />
        </GridItem>
      )
    }
  }
  render() {
    const { classes, onSubmitForm, inputValue, onChangeInput, reposListProps } = this.props;
    const { loading, error, repos } = reposListProps;
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
                  onChange: onChangeInput
                }}
                formControlProps={{
                  fullWidth: true
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
    )
  }
}

export default withStyles(repoListStyle)(SectionRepoList);
