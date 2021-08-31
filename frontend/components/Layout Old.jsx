import React, { useEffect, useState } from "react";

// Next
import { useRouter } from "next/router";

import clsx from 'clsx';

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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Snackbar
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "inherit",
    padding: 0,
    boxShadow: "none"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    border: 0
  },
  drawerPaper: {
    width: drawerWidth,
    border: 0
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    width: `calc(~100vw - ${drawerWidth}px)`,
    height: "100vh",
    justifyContent: "space-evenly",
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: "space-evenly",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerButton: {

  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Layout = ({ children }) => {
  const classes = useStyles();
  const matches = useMediaQuery(`(min-width:600px)`);
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
    if (drawerOpen && !matches) {
      handleDrawerOpen();
    }
    else if (!drawerOpen && matches) {
      handleDrawerOpen();
    }
  }, [matches]);

  return (
    <Grid container>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <NavBar handleDrawerOpen={handleDrawerOpen} />
      </Drawer>

      <Grid item >

        <AppBar position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}>
          <Toolbar>
            {!drawerOpen ? <Button className={classes.drawerButton} onClick={() => handleDrawerOpen()}> <MenuIcon /> </Button> : ""}
          </Toolbar>
        </AppBar>

        <Container className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}>
          <div className={classes.drawerHeader} />
          <Container>
            {children}
          </Container>
        </Container>

      </Grid>

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
