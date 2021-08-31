import React, { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useDispatch } from "react-redux";
import { ER_INNLOGGET } from "../src/query/auth";
import { loggInn, loggUt } from "../src/actions/auth";

import { useLazyQuery } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

// Components
import Sidebar from "./Sidebar";
import Navbar from "./NavBar";

// Material-UI
import { Box, Alert, Snackbar, styled, useMediaQuery } from "@material-ui/core";

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Layout = ({ children }) => {
  const matches = useMediaQuery(`(min-width: 1200px`);
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const router = useRouter();
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");
  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [sjekkOmInnlogget] = useLazyQuery(ER_INNLOGGET, {
    onCompleted(data) {
      if (data.sjekkToken) {
        dispatch(loggInn(data.sjekkToken));
      }
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  useEffect(() => {
    if (cookies.TokenCookie) {
      sjekkOmInnlogget();
    } else {
      dispatch(loggUt);
      router.push("/login");
    }
  }, [cookies, router]);

  useEffect(() => {
    if (!matches && drawerOpen) {
      handleDrawerOpen();
    }
    if (matches && !drawerOpen) {
      handleDrawerOpen();
    }
  }, [matches]);

  return (
    <>
      <Snackbar open={feilmelding} autoHideDuration={6000} onClose={() => setFeilmelding(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
      <RootStyle>
        <Navbar onOpenSidebar={() => setOpen(true)} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <Box sx={{ px: 5, py: 15, flexGrow: 1 }}>{children}</Box>
      </RootStyle>
    </>
  );
};

export default Layout;
