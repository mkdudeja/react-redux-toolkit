import { UserRole } from "../shared/config";
import { IUserDetails } from "./user-management.interface";

export class UserModel implements IUserDetails {
  id: number = null;
  name = "";
  phone = "";
  address = "";
  username = "";
  role = "3" as UserRole;
  emp_code = "";
  designation = "";
  language: number = null;
  is_active = 1;
  date_created = new Date().toJSON();
}
