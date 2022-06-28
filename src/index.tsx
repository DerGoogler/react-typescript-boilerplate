import App from "./App";
import UiXTheme from "./OnUiX/theme/UiXTheme";

// Styles
import "./styles/default.scss";
import "onsenui/css/onsenui-core.css";
import render from "./OnUiX/utils/render";

render<HTMLElement>(App, UiXTheme());
