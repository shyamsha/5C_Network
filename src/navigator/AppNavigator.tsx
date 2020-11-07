import React, { Fragment, Component, FC } from "react";
import { Route, Switch } from "react-router";
import RepoDetails from "../containers/repoDetails/RepoDetails";
import Repo from "../containers/repos/Repo";
import { RouteEnums } from "./RouteEnums";


class AppNavigator extends Component {
  App: FC = () => (
    <Fragment>
      <Switch>
        <Route path={`/`} component={Repo} exact />
        <Route path={`/${RouteEnums.REPODETAILS}/:id`} component={RepoDetails} exact />
      </Switch>
    </Fragment>
  );

  render() {
    return <this.App />;
  }
}

export default AppNavigator;
