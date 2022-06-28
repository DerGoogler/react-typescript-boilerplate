import { createRoot } from "react-dom/client";
import App from "./App";
import XInit from "./OnUiX/extend/XInit";

// Styles
import "./styles/default.scss";
import "onsenui/css/onsenui-core.css";
import UiXTheme from "./OnUiX/theme/UiXTheme";

// Setup root node where our React app will be attached to
const app = document.createElement("app");
document.body.appendChild(app);

// Render the app component
const container = document.querySelector("app");
const root = createRoot(container!);
root.render(<XInit component={App} theme={UiXTheme()} />);
