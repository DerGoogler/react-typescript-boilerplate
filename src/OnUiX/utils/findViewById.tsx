/**
 * @param id Given element or ref
 * @param callback HTMLElement or React.RefObject
 *
 * @description
 * Usage
 * ```ts
 * // Id's
 * findViewById("element", (element: HTMLElement) => { element.style.display = "none" })
 *
 * // Refs
 * findViewById(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
 * ```
 */
export default class<Object = any> {
  private return: Object | null | undefined | Element;
  public constructor(id: string | React.RefObject<Object>, callback?: (...props: any) => void) {
    if (typeof id == "string") {
      var element: HTMLElement | null;
      if ((element = document.getElementById(id))) {
        if (typeof callback == "function") {
          callback(element);
        } else {
          this.return = element;
        }
      }
    } else {
      var reff: React.RefObject<Object>;
      if ((reff = id)) {
        if (reff && reff.current) {
          if (typeof callback == "function") {
            callback(reff.current);
          }
        } else {
          this.return = reff.current;
        }
      }
    }
  }

  public get get() {
    return this.return;
  }
}
