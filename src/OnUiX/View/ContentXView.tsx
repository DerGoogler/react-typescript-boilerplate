import { isAndroid, isMobile } from "react-device-detect";
import ViewX from "../extend/ViewX";

/**
 * ContentXView is an optional component, to improve the view better on desktop
 */
export default class extends ViewX {
  private stlye: any = {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "200px",
    maxWidth: "580px",
    margin: "0px auto",
    padding: isMobile ? "" : "45px",
  };

  private checkDevice(designWeb: any, designAndroid: any) {
    if (isAndroid) {
      return designAndroid;
    } else {
      return designWeb;
    }
  }

  public render() {
    const { className } = this.props;
    return (
      <content-x-view style={this.checkDevice({ padding: isMobile ? "" : "16px" }, {})}>
        <content-x-view-inner style={this.checkDevice(this.stlye, {})}>{this.props.children}</content-x-view-inner>
      </content-x-view>
    );
  }
}
