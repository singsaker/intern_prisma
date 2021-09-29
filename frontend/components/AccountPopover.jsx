import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from "@mui/material";
// components
import MenuPopover from "./MenuPopover";
//
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";

// Beboer Query
import { useLazyQuery } from "@apollo/client";
import { GET_BEBOER } from "../src/query/beboer";
import { getBeboer } from "../src/actions/beboer";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Profil",
    icon: Person,
    linkTo: "#",
  },
  {
    label: "Innstillinger",
    icon: Settings,
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const beboerId = useSelector((state) => state.auth.beboer_id);
  const beboere = useSelector((state) => state.beboer.beboere);

  const [beboerQuery] = useLazyQuery(GET_BEBOER, {
    onCompleted(data) {
      dispatch(getBeboer(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (beboerId && !beboere[beboerId]) {
      beboerQuery({
        variables: {
          id: beboerId,
        },
      });
    }
  }, [beboerId]);

  return <>
    <IconButton
      ref={anchorRef}
      onClick={handleOpen}
      sx={{
        padding: 0,
        width: 44,
        height: 44,
        ...(open && {
          "&:before": {
            zIndex: 1,
            content: "''",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            position: "absolute",
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          },
        }),
      }}
      size="large">
      <Avatar src="https://source.unsplash.com/200x200/?mugshot" alt="photoURL" />
    </IconButton>

    <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle1" noWrap>
          {beboerId && beboere[beboerId]
            ? beboere[beboerId].fornavn + " " + beboere[beboerId].etternavn
            : "Laster..."}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {beboerId && beboere[beboerId] ? beboere[beboerId].epost : "Laster..."}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {MENU_OPTIONS.map((option) => (
        <MenuItem key={option.label} onClick={handleClose} sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <option.icon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />

          {option.label}
        </MenuItem>
      ))}

      <Box sx={{ p: 2, pt: 1.5 }}>
        <Button fullWidth color="inherit" variant="outlined">
          Logg ut
        </Button>
      </Box>
    </MenuPopover>
  </>;
}
