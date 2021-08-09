import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/home.component";
import { PrivateRoute } from "./shared/components";
import { RoutePermissionType } from "./shared/config";
import { RoutePermission } from "./shared/models";

const LazyAccount = React.lazy(() =>
  import("./account/account.component").then((module) => module)
);

function AppRouterOutlet() {
  const homePermission = React.useMemo(
    () => RoutePermission.factory([], RoutePermissionType.OnlyLoginRequired),
    []
  );
  return (
    <Suspense fallback={<></>}>
      <Switch>
        <PrivateRoute exact path="/" routePermission={homePermission}>
          <Home />
        </PrivateRoute>
        <Route path="/account">
          <LazyAccount />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default AppRouterOutlet;
