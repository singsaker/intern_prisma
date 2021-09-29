import { GlobalStyles as MuiGlobalStyles } from "@mui/material";
import palette from "./palette";

// ----------------------------------------------------------------------

const styles = {
  "@global": {
    "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    html: {
      width: "100%",
      height: "100%",
      msTextSizeAdjust: "100%",
      WebkitOverflowScrolling: "touch",
    },
    body: {
      width: "100%",
      height: "100%",
    },
    "#root": {
      width: "100%",
      height: "100%",
    },
    input: {
      "&[type=number]": {
        MozAppearance: "textfield",
        "&::-webkit-outer-spin-button": { margin: 0, WebkitAppearance: "none" },
        "&::-webkit-inner-spin-button": { margin: 0, WebkitAppearance: "none" },
      },
    },
    textarea: {
      "&::-webkit-input-placeholder": { color: palette.text.disabled },
      "&::-moz-placeholder": { opacity: 1, color: palette.text.disabled },
      "&:-ms-input-placeholder": { color: palette.text.disabled },
      "&::placeholder": { color: palette.text.disabled },
    },
    a: { color: palette.primary.main },
    img: { display: "block", maxWidth: "100%" },
  },
};

const GlobalStyles = () => <MuiGlobalStyles styles={styles} />;

export default GlobalStyles;
