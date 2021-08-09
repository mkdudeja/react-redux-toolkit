export enum RequestState {
  idle = "idle",
  pending = "pending",
}

export enum UserRole {
  Admin = "1",
  HOD = "2",
  Teacher = "3",
}

export enum AuthorizationResult {
  Success = 1,
  LoginRequired = 2,
  Unauthorized = 3,
}

export enum RoutePermissionType {
  OneRoleRequired = 1,
  AllRolesRequired = 2,
  OnlyLoginRequired = 3,
}
