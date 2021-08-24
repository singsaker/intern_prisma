import React, { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useDispatch } from "react-redux";
import { ER_INNLOGGET } from "../src/query/auth";
import { loggInn, loggUt } from "../src/actions/auth";

import { useLazyQuery } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

import NavBar from "./NavBar";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Drawer from '@material-ui/core/Drawer';
import Button from "@material-ui/core/Button";

// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  header: {
    height: "50px"
  },
  drawerButton: {
    height: "inherit"
  },
  drawer: {
    border: 0,
    width: drawerWidth
  },
  drawerPaper: {
    border: 0
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  sidebar: {
    width: drawerWidth
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Layout = ({ children }) => {
  const classes = useStyles();
  const matches = useMediaQuery(`(min-width: 1200px`);
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const router = useRouter();
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");

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
    <Grid container className={classes.root} style={{ display: matches && drawerOpen ? "grid" : "", gridTemplateColumns: matches && drawerOpen ? `${drawerWidth}px auto` : "" }}>
      {!matches ?

        <Drawer
          className={classes.drawer}
          onClose={handleDrawerOpen}
          anchor="left"
          open={drawerOpen}
          classes={{ paper: classes.drawerPaper }}>
          <NavBar handleDrawerOpen={handleDrawerOpen} matches={false} />
        </Drawer>

        :
        <Grid className={classes.sidebar} item>
          <NavBar handleDrawerOpen={handleDrawerOpen} matches={matches} />
        </Grid>}



      <Container item style={{ width: "100%" }}>

        <Grid item className={classes.header}>
          {!drawerOpen ? <Button className={classes.drawerButton} onClick={handleDrawerOpen}> <MenuIcon /> </Button> : ""}
        </Grid>

        <Container>
          {children}
        </Container>
      </Container>

      <Snackbar
        open={feilmelding}
        autoHideDuration={6000}
        onClose={() => setFeilmelding(false)}
      >
        <Alert onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </Grid >
  );
};

export default Layout;
