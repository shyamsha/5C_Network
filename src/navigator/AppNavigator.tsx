import React, { Fragment, Component, FC } from "react";
import { Route, Switch } from "react-router";
import Repo from "../containers/repos/Repo";


class AppNavigator extends Component {
  App: FC = () => (
    <Fragment>
      <Switch>
        <Route path={`/`} component={Repo} exact />
      </Switch>
    </Fragment>
  );

  render() {
    return <this.App />;
  }
}

export default AppNavigator;
