export default class {
  /**
   * Retuns the current page link
   * @param url string
   * @returns {string} string
   */
  public static getSubPath(url: string) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
  }

  /**
   * Checks if an string link is valid
   * @param input string
   * @returns {boolean} boolean
   */
  public static validURL(input: string): boolean {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(input);
  }

  public static stringToBoolean(value: string) {
    if (typeof value == "boolean") return value;
    switch (value) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
      case null:
        return false;

      default:
        return Boolean(value);
    }
  }

  /**
   * @deprecated
   */
  public static typeIF(_: any, __: any, ___: any) {
    if (this.stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  public static typeCheck(_: any, __: any) {
    if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
      return __;
    } else {
      return _;
    }
  }

  public static returnUndefined(value: undefined | any, theReturn: string | boolean | number): any {
    if (value === undefined) {
      return theReturn;
    } else {
      return false;
    }
  }

  public static setURL(
    callback: (
      set: (data: any, unused: string, url?: string | URL | null | undefined) => void,
      currentPath: string
    ) => void
  ): void {
    const loc = window.location.pathname;
    const set = (data: any, unused: string, url?: string | URL | null | undefined) =>
      window.history.pushState(data, unused, url);
    const currentPath: string = loc === "/" ? "" : loc;
    if (typeof callback == "function") {
      callback(set, currentPath);
    }
  }
}
