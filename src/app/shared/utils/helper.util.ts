class Helper {
  private static _instance: Helper;

  public static getInstance(): Helper {
    if (!Helper._instance) {
      Helper._instance = new Helper();
    }

    return Helper._instance;
  }

  doesExist(value: any) {
    return (
      typeof value !== "undefined" &&
      value !== null &&
      (typeof value === "string" ? !!value.length : true)
    );
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

  getPropertyValue<T>(
    object: { [key: string]: any },
    propertyPath: string,
    defaultValue: any = null
  ): T {
    return this.doesObjectContainProperty(object, propertyPath)
      ? propertyPath.split(".").reduce((previous, current) => {
          return previous[current];
        }, object)
      : defaultValue;
  }

  doesObjectContainProperty(
    object: { [key: string]: any },
    propertyPath: string
  ): boolean {
    // If there's nothing to check
    if (typeof object !== "object" || !object || !Object.keys(object).length) {
      return false;
    }

    // If there's nothing to check
    if (!propertyPath || !propertyPath.length) {
      return false;
    }

    try {
      // Iterate through propertyPath to dig into the object
      const finalValue = propertyPath.split(".").reduce((previous, current) => {
        // No hasOwnProperty check
        return typeof previous !== "undefined" && previous !== null
          ? previous[current]
          : undefined;
      }, object);
      // We specifically want to check for undefined & null to check if value exist here
      return typeof finalValue !== "undefined" && finalValue !== null;
    } catch (error) {
      // If the path has a wrong turn, the reduce function will throw an error
      return false;
    }
  }

  parseObjectForInt<T>(
    dataSource: { [k: string]: any },
    keys: Array<string>
  ): T {
    keys.forEach((key) => {
      dataSource[key] = parseInt(dataSource[key], 10);
    });
    return dataSource as T;
  }

  parseObjectsForArray<T>(dataSource: Array<T>, keys: Array<string>): Array<T> {
    return dataSource.map((row: { [k: string]: any }) => {
      keys.forEach((key: string) => {
        row[key] = JSON.parse(row[key]);
      });
      return row as T;
    });
  }

  parseObjectForArray<T>(
    dataSource: { [k: string]: any },
    keys: Array<string>
  ): T {
    keys.forEach((key: string) => {
      dataSource[key] = JSON.parse(dataSource[key]);
    });
    return dataSource as T;
  }
}

export const helper = Helper.getInstance();
