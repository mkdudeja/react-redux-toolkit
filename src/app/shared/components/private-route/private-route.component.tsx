import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthorizationResult } from "../../config";
import { useAuthorization } from "../../hooks";
import { RoutePermission } from "../../models";

interface IPrivateRouteProps extends RouteProps {
  routePermission: RoutePermission;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  children,
  routePermission,
  ...rest
}: IPrivateRouteProps) => {
  const authorization = useAuthorization(routePermission);
  console.log(JSON.stringify(routePermission), authorization);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorization === AuthorizationResult.Unauthorized ? (
          "unathorized"
        ) : authorization === AuthorizationResult.LoginRequired ? (
          <Redirect
            to={{
              pathname: "/account/login",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
