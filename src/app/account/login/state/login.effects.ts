import * as accountService from "../../account.service";
import { ILoginRequest } from "../login.iterface";

export const loginHandler = async (data: ILoginRequest) => {
  try {
    const response = await accountService.login(data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
