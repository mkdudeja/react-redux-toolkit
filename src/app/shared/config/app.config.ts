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

  getAllUsers = `user/getAllUsers`;
  saveUser = `user/saveUser`;
  deleteUser = `user/deleteUser`;
  updateUser = `user/updateUser`;
  updateStatus = `user/updateStatus`;

  getDocuments = `document/getDocuments`;
  saveDocument = `document/saveDocument`;
  deleteDocument = `document/deleteDocument`;
  updateDocument = `document/updateDocument`;
  updateDocStatus = `document/updateStatus`;
  downloadDocument = `document/downloadDocument`;
  getDocumentMasterData = `document/getDocumentMasterData`;

  getLanguages = `language/getLanguages`;
  saveLanaguge = `language/saveLanguage`;
  deleteLanaguge = `language/deleteLanguage`;
  updateLanaguge = `language/updateLanguage`;
  updateLanguageStatus = `language/updateStatus`;
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
