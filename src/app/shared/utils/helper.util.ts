class Helper {
  private static _instance: Helper;

  private constructor() {}

  public static getInstance(): Helper {
    if (!Helper._instance) {
      Helper._instance = new Helper();
    }

    return Helper._instance;
  }

  debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: any;
    return function (this: any, ...args: any[]) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

export const helper = Helper.getInstance();
