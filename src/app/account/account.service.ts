import { appConstants } from "../shared/config";
import { networkService, storageService } from "../shared/services";
import { helper } from "../shared/utils";
import {
  ILoginRequest,
  ILoginResponse,
  IUserData,
} from "./login/login.iterface";

const KEYS_TO_PARSE = ["id", "role", "language"];

export const login = async (data: ILoginRequest) => {
  try {
    const result = await networkService.post<ILoginResponse>(
      appConstants.urls.login,
      data
    );
    result.user = helper.parseObjectForInt<IUserData>(
      result.user,
      KEYS_TO_PARSE
    );
    storageService.setItem(appConstants.keys.token, result.token);
    storageService.setItem(appConstants.keys.user, result.user);
    return result;
  } catch (error) {
    throw error;
  }
};
