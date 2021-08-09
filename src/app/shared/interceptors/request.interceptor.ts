import { AxiosRequestConfig } from "axios";
import { appConstants } from "../config";
import { storageService } from "../services";

const requestInterceptor = (config: AxiosRequestConfig) => {
  const authToken = storageService.getItem<string>(appConstants.keys.token);
  if (authToken !== null) {
    Object.assign(config.headers, {
      Authorization: `Bearer ${authToken}`,
    });
  }
  return config;
};

export default requestInterceptor;
