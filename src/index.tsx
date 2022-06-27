import { createRoot } from "react-dom/client";
import App from "./App";

// Styles
import "./styles/default.scss";

// Setup root node where our React app will be attached to
const app = document.createElement("app");
document.body.appendChild(app);

// Render the app component
const container = document.querySelector("app");
const root = createRoot(container!);
root.render(<App />);
