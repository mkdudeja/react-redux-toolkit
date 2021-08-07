import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ForgotPassword from "./forgot-password/forgot-password.component";
import Login from "./login/login.component";
import ResetPassword from "./reset-password/reset-password.component";

const AccountRouterOutlet: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Login />
      </Route>
      <Route path={`${path}/login`}>
        <Login />
      </Route>
      <Route path={`${path}/forgot-password`}>
        <ForgotPassword />
      </Route>
      <Route path={`${path}/reset-password`}>
        <ResetPassword />
      </Route>
    </Switch>
  );
};

export default AccountRouterOutlet;
