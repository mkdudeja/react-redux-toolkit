import { RoutePermissionType, UserRole } from "../config";

export class RoutePermission {
  permissions: Array<UserRole>;
  permissionType: RoutePermissionType;

  constructor(
    permissions: Array<UserRole>,
    permissionType: RoutePermissionType
  ) {
    this.permissions = permissions;
    this.permissionType = permissionType;
  }

  public static factory(
    permissions: Array<UserRole>,
    permissionType: RoutePermissionType
  ): RoutePermission {
    return new RoutePermission(permissions, permissionType);
  }
}
