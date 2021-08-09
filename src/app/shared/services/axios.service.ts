import axios from "axios";
import { appConstants } from "../config";
import {
  requestInterceptor,
  responseInterceptor,
  setupProgressBar,
} from "../interceptors";

const axiosInstance = axios.create({
  baseURL: appConstants.urls.baseUrl,
});

// setup http progress bar
setupProgressBar(axiosInstance);

// setup request interceptor
axiosInstance.interceptors.request.use(requestInterceptor);

// setup response interceptor
axiosInstance.interceptors.response.use(undefined, responseInterceptor);

// export the axios instance
export default axiosInstance;
