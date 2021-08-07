import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/home.component";

const LazyAccount = React.lazy(() =>
  import("./account/account.component").then((module) => module)
);

function AppRouterOutlet() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/account">
          <LazyAccount />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default AppRouterOutlet;
