import { UserRole } from "../shared/config";
import { IDialogUserDetails, IUserDetails } from "./user-management.interface";

export class UserModel implements IUserDetails {
  id: number = null;
  name = "";
  phone = "";
  address = "";
  username = "";
  role = 3 as UserRole;
  emp_code = "";
  designation = "";
  language = 0;
  is_active = 1;
  date_created = new Date().toJSON();
}

export class DialogUserDetailsModel implements IDialogUserDetails {
  open = false;
  user = new UserModel();
}
