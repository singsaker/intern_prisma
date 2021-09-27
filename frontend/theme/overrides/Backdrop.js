import { alpha } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  const varLow = alpha(theme.palette.common.black, 0.48);
  const varHigh = alpha(theme.palette.common.black, 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: [
            `rgb(22,28,36)`,
            `-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          ],
          "&.MuiBackdrop-invisible": {
            background: "transparent",
          },
        },
      },
    },
  };
}
