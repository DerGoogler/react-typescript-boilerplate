import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import XInit, { ThemeType } from "../extend/XInit";

/**
 * Creates an React DOM
 *
 * @usage
 * ```tsx
 * render<HTMLElement>(App, UiXTheme())
 * ```
 */
export default function <E extends Element = Element>(component: ReactNode, theme: ThemeType) {
  // Setup root node where our React app will be attached to
  const app = document.createElement(component.name);
  document.body.prepend(app);

  // Render the app component
  const container = document.querySelector<E>(component.name);
  const root = createRoot(container!);
  root.render(<XInit component={component} theme={theme} />);
}
