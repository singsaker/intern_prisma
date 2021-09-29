import { useMemo } from "react";
// material
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows as customShadowsMode } from "./shadows";

// ----------------------------------------------------------------------

const shadowsMode = shadows("DARK_MODE");
const customShadows = customShadowsMode("DARK_MODE");

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
