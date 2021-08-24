import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

// Beboer Query
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_BEBOER } from '../src/query/beboer';
import { getBeboer } from '../src/actions/beboer';

// Material-UI
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Container from "@material-ui/core/Container";
import Collapse from '@material-ui/core/Collapse';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Material-UI Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#444",
    width: "250px",
    padding: 0,
    boxShadow: "inset 0 0 3px #000000",
  },
  list: {
    width: '100%',
  },
  nestedList: {
    paddingLeft: theme.spacing(4),
  },
  listDivider: {
    borderBottom: "1px solid #777",
    height: "1px",
    marginBottom: "10px",
    marginTop: "-5px"
  },
  listHeader: {
    fontSize: "24px",
    marginTop: "10px",
    color: "#eee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  drawer: {
    width: "250px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "250px",
  },
  drawerButton: {
    marginLeft: "15px"
  }
}));

const NavBar = (props) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const classes = useStyles();
  const [open, setOpen] = React.useState(router.pathname.includes("/utvalget") ? true : false);

  const handleClick = () => {
    setOpen(!open);
  };


  const beboerId = useSelector(state => state.auth.beboer_id);
  const beboere = useSelector(state => state.beboer.beboere);

  const [beboerQuery] = useLazyQuery(GET_BEBOER, {
    onCompleted(data) {
      dispatch(getBeboer(data));
    },
    onError(error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (beboerId && !beboere[beboerId]) {
      beboerQuery({
        variables: {
          id: beboerId
        }
      });
    }

  }, [beboerId]);

  return (
    <Container className={classes.root}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.list}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" className={classes.listHeader} >
            {"Internsida 4.0"}

            {!props.matches ? <IconButton className={classes.drawerButton} edge="start" onClick={() => props.handleDrawerOpen()}> <ChevronLeftIcon /> </IconButton> : ""}

          </ListSubheader>
        }

      > <ListItem className={classes.listDivider}>

        </ListItem>
        <ListItem selected={router.pathname === "/"} button onClick={() => router.push("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Hjem" />
        </ListItem>
        <ListItem selected={router.pathname === "/singsaker"} button onClick={() => router.push("/singsaker")}>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Singsaker" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ImportantDevicesIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button selected={router.pathname === "/utvalget/romsjef"} className={classes.nestedList} onClick={() => router.push("/utvalget/romsjef")}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Romsjef" />
            </ListItem>
            <ListItem button selected={router.pathname === "/utvalget/vaktsjef/drikke"} className={classes.nestedList} onClick={() => router.push("/utvalget/vaktsjef/drikke")}>
              <ListItemIcon>
                <AccessAlarmIcon />
              </ListItemIcon>
              <ListItemText primary="Vaktsjef" />
            </ListItem>
            <ListItem button selected={router.pathname === "/utvalget/sekretaer"} className={classes.nestedList} onClick={() => router.push("/utvalget/sekretaer")}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Sektretær" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem className={classes.listDivider}>

        </ListItem>
        <ListItem button selected={router.pathname === "/profil"} onClick={() => router.push("/profil")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={beboerId && beboere[beboerId] ? beboere[beboerId].fornavn + " " + beboere[beboerId].etternavn : "Laster..."} />
        </ListItem>
      </List>
    </Container >
  );
}


/*
<Collapse component="li" in={open} timeout="auto" unmountOnExit>
      <Button>Hey</Button>
    </Collapse>
    
<Navbar bg="dark" variant="dark" style={{ width: "100%" }}>
  <Container style={{ display: "flex", flexDirection: "column" }}>
    <Navbar.Brand >Internsida</Navbar.Brand>
    <Nav className="mr-auto" style={{ display: "flex", flexDirection: "column", height: matches ? "100vh" : "20vh" }}>
      <Nav.Link onClick={() => router.push("/")}>Hjem</Nav.Link>
      <Nav.Link onClick={() => router.push("/singsaker")}>
        Singsaker
      </Nav.Link>
      {tilgang.utvalget ||
        (tilgang.data && (
          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => router.push("/utvalget/romsjef")}
            >
              Romsjef
            </NavDropdown.Item>
            <NavDropdown.Item>Vaktsjef</NavDropdown.Item>
            <NavDropdown.Item>Kosesjef</NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => router.push("/utvalget/sekretaer")}
            >
              Sekretær
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
          </NavDropdown>
        ))}

      <Nav.Link onClick={() => router.push("/profil")}>Profil</Nav.Link>
    </Nav>
  </Container>
</Navbar>
*/

export default NavBar;
