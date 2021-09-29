// material
import { styled } from "@mui/material/styles";
import { Toolbar, OutlinedInput, InputAdornment } from "@mui/material";
import Search from "@mui/icons-material/Search";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

const BeboerListeToolbar = ({ filterName, onFilterName }) => {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Søk etter beboer..."
        startAdornment={
          <InputAdornment position="start">
            <Search sx={{ color: "text.disabled" }} />
          </InputAdornment>
        }
      />
    </RootStyle>
  );
};

export default BeboerListeToolbar;
