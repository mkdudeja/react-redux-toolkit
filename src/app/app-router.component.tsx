import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/dashboard.component";
import { PrivateRoute } from "./shared/components";
import { RoutePermissionType, UserRole } from "./shared/config";
import { RoutePermission } from "./shared/models";

const LazyAccount = React.lazy(() =>
    import("./account/account.component").then((module) => module)
  ),
  LazyDocuments = React.lazy(() =>
    import("./documents/documents.component").then((module) => module)
  ),
  LazyLanguage = React.lazy(() =>
    import("./language/language.component").then((module) => module)
  ),
  LazyUserManagement = React.lazy(() =>
    import("./user-management/user-management.component").then(
      (module) => module
    )
  );

function AppRouterOutlet() {
  const loginPermission = React.useMemo(
      () => RoutePermission.factory([], RoutePermissionType.OnlyLoginRequired),
      []
    ),
    adminPermission = React.useMemo(
      () =>
        RoutePermission.factory(
          [UserRole.Admin],
          RoutePermissionType.AllRolesRequired
        ),
      []
    );
  return (
    <Suspense fallback={<></>}>
      <Switch>
        <PrivateRoute exact path="/" routePermission={loginPermission}>
          <Dashboard />
        </PrivateRoute>
        <Route path="/account">
          <LazyAccount />
        </Route>
        <PrivateRoute path="/documents" routePermission={loginPermission}>
          <LazyDocuments />
        </PrivateRoute>
        <PrivateRoute path="/language" routePermission={adminPermission}>
          <LazyLanguage />
        </PrivateRoute>
        <PrivateRoute path="/user-management" routePermission={adminPermission}>
          <LazyUserManagement />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
}

export default AppRouterOutlet;
