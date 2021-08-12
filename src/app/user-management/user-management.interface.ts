import { UserRole } from "../shared/config";

export interface IUserDetails {
  id: number;
  name: string;
  phone: string;
  address: string;
  username: string;
  role: UserRole;
  emp_code: string;
  designation: string;
  language: number;
  is_active: number;
  date_created: string;
}
