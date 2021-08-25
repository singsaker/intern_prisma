import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

// Beboer Query
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_BEBOER } from '../src/query/beboer';
import { getBeboer } from '../src/actions/beboer';

// Material-UI
import { Drawer, Hidden, Typography, List, Box, Avatar, Link as MuiLink, ListItemButton } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { styled, alpha, useTheme } from '@material-ui/core/styles';

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

import Scrollbar from "./Scrollbar";

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  })
);

const ListSubheaderStyle = styled(ListSubheader)(
  ({ theme }) => ({
    ...theme.typography.overline,
    position: 'relative',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const routes = [
  { title: "Hjem", path: "/", icon: HomeIcon },
  { title: "Singsaker ", path: "/singsaker", icon: AccountBalanceIcon }
]

const adminRoutes = [
  { title: "Romsjef", path: "/utvalget/romsjef", icon: SupervisorAccountIcon },
  { title: "Vaktsjef", path: "/utvalget/vaktsjef/drikke", icon: AccessAlarmIcon },
  { title: "Sekretær", path: "/utvalget/sekretaer", icon: MenuBookIcon },
]

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [open, setOpen] = React.useState(router.pathname.includes("/utvalget") ? true : false);
  const theme = useTheme();

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

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ mt: 2.5, mb: 5, mx: 5 }}>
        <Typography variant="h6">Internsida Sing</Typography>
      </Box>

      <List component="div" disablePadding>
        {routes.map((item) => {
          const { title, path, icon } = item;

          return (
            <Link href={path}>
              <ListItemStyle
                sx={{
                  ...(router.pathname === path && activeRootStyle)
                }}
              >
                <ListItemIconStyle>{icon && <item.icon />}</ListItemIconStyle>
                <ListItemText disableTypography primary={title} />
              </ListItemStyle>
            </Link>
          );
        })}
        <ListSubheaderStyle>
          Admin
        </ListSubheaderStyle>
        {adminRoutes.map((item) => {
          const { title, path, icon } = item;

          return (
            <Link href={path}>
              <ListItemStyle
                sx={{
                  ...(router.pathname === path && activeRootStyle)
                }}
              >
                <ListItemIconStyle>{icon && <item.icon />}</ListItemIconStyle>
                <ListItemText disableTypography primary={title} />
              </ListItemStyle>
            </Link>
          );
        })}
      </List>

      <Box sx={{ my: 5, mx: 2.5 }}>
        <Link href="/profil">
          <MuiLink underline="none">
            <AccountStyle>
              <Avatar src={"https://source.unsplash.com/200x200/?mugshot"} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {beboerId && beboere[beboerId] ? beboere[beboerId].fornavn + " " + beboere[beboerId].etternavn : "Laster..."}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Beboer
                </Typography>
              </Box>
            </AccountStyle>
          </MuiLink>
        </Link>
      </Box>
    </Scrollbar >
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={props.isOpenSidebar}
          onClose={props.onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
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

export default Sidebar;
