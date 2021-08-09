import { appConstants } from "../shared/config";
import { networkService, storageService } from "../shared/services";
import { ILoginRequest, ILoginResponse } from "./login/login.iterface";

export const login = async (data: ILoginRequest) => {
  try {
    const result = await networkService.post<ILoginResponse>(
      appConstants.urls.login,
      data
    );
    storageService.setItem(appConstants.keys.token, result.token);
    storageService.setItem(appConstants.keys.user, result.user);
    return result;
  } catch (error) {
    throw error;
  }
};
