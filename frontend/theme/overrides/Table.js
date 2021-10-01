import { alpha } from "@mui/system";

export default function Table(theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: alpha(theme.palette.grey[700], 0.5),
        },
      },
    },
  };
}
