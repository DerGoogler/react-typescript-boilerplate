import { createRoot } from "react-dom/client";
import { App } from "./App";

const app = document.createElement("app");
document.body.prepend(app);
const container = document.querySelector<Element>("app");
const root = createRoot(container!);
root.render(<App />);
