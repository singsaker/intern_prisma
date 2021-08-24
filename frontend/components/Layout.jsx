import React, { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useDispatch } from "react-redux";
import { ER_INNLOGGET } from "../src/query/auth";
import { loggInn, loggUt } from "../src/actions/auth";

import { useLazyQuery } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

import Sidebar from "./Sidebar";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Drawer from '@material-ui/core/Drawer';
import Button from "@material-ui/core/Button";
import { styled } from '@material-ui/core/styles';

// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';

// import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "./NavBar";
import { Box } from "@material-ui/core";

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100vw",
//     height: "100vh",
//   },
//   header: {
//     height: "50px"
//   },
//   drawerButton: {
//     height: "inherit"
//   },
//   drawer: {
//     border: 0,
//     width: drawerWidth
//   },
//   drawerPaper: {
//     border: 0
//   },
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
//   sidebar: {
//     width: drawerWidth
//   }
// }));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
      <RootStyle>
        <Navbar onOpenSidebar={() => setOpen(true)} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}  />
        <Box sx={{ px: 5, pt: 15, flexGrow: 1 }}>
          {children}
        </Box>
      
      </RootStyle >
      <Snackbar
        open={feilmelding}
        autoHideDuration={6000}
        onClose={() => setFeilmelding(false)}
      >
        <Alert onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Layout;
