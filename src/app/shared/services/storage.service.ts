import { appConstants } from "../config";

class StorageService {
  private static _instance: StorageService;

  public static getInstance(): StorageService {
    if (!StorageService._instance) {
      StorageService._instance = new StorageService();
    }

    return StorageService._instance;
  }

  getItem<T>(
    key: string,
    storageType: string = appConstants.keys.storageType
  ): T {
    switch (storageType) {
      case appConstants.storageTypes.local:
        return JSON.parse(localStorage.getItem(key));

      case appConstants.storageTypes.session:
        return JSON.parse(sessionStorage.getItem(key));
    }
  }

  setItem(
    key: string,
    data: Object,
    storageType = appConstants.keys.storageType
  ) {
    switch (storageType) {
      case appConstants.storageTypes.local:
        localStorage.setItem(key, JSON.stringify(data));
        break;

      case appConstants.storageTypes.session:
        sessionStorage.setItem(key, JSON.stringify(data));
        break;
    }
  }

  removeItem(key: string, storageType: string = appConstants.keys.storageType) {
    switch (storageType) {
      case appConstants.storageTypes.local:
        localStorage.removeItem(key);
        break;

      case appConstants.storageTypes.session:
        sessionStorage.removeItem(key);
        break;
    }
  }

  clearAll(storageType: string = appConstants.keys.storageType) {
    switch (storageType) {
      case appConstants.storageTypes.local:
        localStorage.clear();
        break;

      case appConstants.storageTypes.session:
        sessionStorage.clear();
        break;
    }
  }
}

const storageService = StorageService.getInstance();
export default storageService;
