import { ThemeType } from "../extend/XInit";
import dark_theme from "./dark_theme";
import light_theme from "./light_theme";

/**
 * Uses the defaut OnUiX theme
 * @param themeMode light or dark
 * @returns {ThemeType} ThemeType
 * @default light
 */
export default function (themeMode?: "light" | "dark"): ThemeType {
  switch (themeMode) {
    case "light":
      return light_theme;
    case "dark":
      return dark_theme;
    default:
      return light_theme;
  }
}
