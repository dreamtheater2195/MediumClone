import React from "react";
import { shallow } from "enzyme";
import { IntlProvider } from "react-intl";
import { mountWrap } from "utils/mountWrap";
import SectionRepoList from "./../Sections/SectionRepoList";
import { HomePage, mapDispatchToProps } from "../index";
import { changeUsername } from "../actions";
import { loadRepos } from "../../App/actions";
describe("<HomePage />", () => {
  it("should render the repos list", () => {
    const renderedComponent = shallow(
      <HomePage loading error={false} repos={[]} classes={{}} />,
    );
    const reposListProps = {
      loading: true,
      error: false,
      repos: [],
    };
    expect(
      renderedComponent.contains(
        <SectionRepoList reposListProps={reposListProps} />,
      ),
    ).toEqual(true);
  });

  it("should render fetch the repos on mount if a username exists", () => {
    const submitSpy = jest.fn();
    mountWrap(
      <IntlProvider locale="en">
        <HomePage
          username="Not Empty"
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
          classes={{}}
        />
      </IntlProvider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it("should not call onSubmitForm if username is an empty string", () => {
    const submitSpy = jest.fn();
    mountWrap(
      <IntlProvider locale="en">
        <HomePage
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
          classes={{}}
        />
      </IntlProvider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it("should not call onSubmitForm if username is null", () => {
    const submitSpy = jest.fn();
    mountWrap(
      <IntlProvider locale="en">
        <HomePage
          username=""
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
          classes={{}}
        />
      </IntlProvider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe("mapDispatchToProps", () => {
    describe("onChangeUsername", () => {
      it("should be injected", () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toBeDefined();
      });

      it("should dispatch changeUsername when called", () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const username = "mxstbr";
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });

    describe("onSubmitForm", () => {
      it("should be injected", () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it("should dispatch loadRepos when called", () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(loadRepos());
      });
    });
  });
});
