import React, { Fragment, Component, FC } from "react";
import { Route, Switch } from "react-router";


class AppNavigator extends Component {
  App: FC = () => (
    <Fragment>
      <Switch>
        <Route path={`/`} component={()=>null} exact />
      </Switch>
    </Fragment>
  );

  render() {
    return <this.App />;
  }
}

export default AppNavigator;
