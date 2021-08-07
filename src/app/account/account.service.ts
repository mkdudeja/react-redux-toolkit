import axios from "axios";
import { appConstants } from "../shared";
import { ILoginRequest, ILoginResponse } from "./login/login.iterface";

export const login = async (data: ILoginRequest) => {
  try {
    const result = await axios.post<ILoginResponse>(
      appConstants.urls.login,
      data
    );
    return result;
  } catch (error) {
    throw error;
  }
};
