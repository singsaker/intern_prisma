import { useMemo } from "react";
// material
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@material-ui/core/styles";
//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows as customShadowsMode } from "./shadows";

// ----------------------------------------------------------------------

const shadowsMode = shadows("LIGHT_MODE");
const customShadows = customShadowsMode("LIGHT_MODE");

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadowsMode,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
