import React from "react";
import { AuthorizationResult, RoutePermissionType, UserRole } from "../config";
import { RoutePermission } from "../models";
import useAuthState from "./useAuthState";

function useAuthorization(routePermission: RoutePermission) {
  const authState = useAuthState(),
    getAuthorizationResult = (): AuthorizationResult => {
      if (!authState || !authState.token) {
        return AuthorizationResult.LoginRequired;
      }

      let isAuthorized = false;
      if (
        routePermission.permissionType === RoutePermissionType.OnlyLoginRequired
      ) {
        isAuthorized = true;
      } else if (
        routePermission.permissionType === RoutePermissionType.OneRoleRequired
      ) {
        isAuthorized = routePermission.permissions.some(
          (permission: UserRole) => permission === authState.user.role
        );
      } else if (
        routePermission.permissionType === RoutePermissionType.AllRolesRequired
      ) {
        isAuthorized = !routePermission.permissions.some(
          (permission: UserRole) => permission !== authState.user.role
        );
      }

      return isAuthorized
        ? AuthorizationResult.Success
        : AuthorizationResult.Unauthorized;
    };

  return React.useMemo(getAuthorizationResult, [routePermission, authState]);
}

export default useAuthorization;
