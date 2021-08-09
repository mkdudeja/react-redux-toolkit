class AppStorageTypes {
  local = "localStorage";
  session = "sessionStorage";
}

class AppKeys {
  user = "userInfo";
  token = "accessToken";
  storageType = "sessionStorage";
}

class AppUrls {
  baseUrl = "http://localhost/aiislrc/api";
  login = `account/login`;
}

/**
 * Application constants
 */
class AppConstants {
  private static _instance: AppConstants;

  public keys = new AppKeys();
  public urls = new AppUrls();
  public storageTypes = new AppStorageTypes();

  private constructor() {}

  public static getInstance(): AppConstants {
    if (!AppConstants._instance) {
      AppConstants._instance = new AppConstants();
    }

    return AppConstants._instance;
  }
}

const appConstants = AppConstants.getInstance();
export default appConstants;
