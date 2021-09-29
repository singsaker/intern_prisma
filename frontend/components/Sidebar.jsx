import React, { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

// Beboer Query
import { useLazyQuery } from "@apollo/client";
import { GET_BEBOER } from "../src/query/beboer";
import { getBeboer } from "../src/actions/beboer";

// Material-UI
import {
  Drawer,
  Hidden,
  Typography,
  List,
  Box,
  Avatar,
  Link as MuiLink,
  ListItemButton,
  ListSubheader,
  ListItemText,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";

// Material-UI Icons
import HomeIcon from "@mui/icons-material/Home";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ListItemIcon from "@mui/material/ListItemIcon";

import Scrollbar from "./Scrollbar";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[900],
}));

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  "&:before": {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: "none",
    position: "absolute",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  position: "relative",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1.5),
  background: "transparent",
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const routes = [
  { title: "Hjem", path: "/", icon: HomeIcon },
  { title: "Singsaker ", path: "/singsaker", icon: AccountBalanceIcon },
];

const adminRoutes = [
  { title: "Romsjef", path: "/utvalget/romsjef", icon: SupervisorAccountIcon },
  { title: "Vaktsjef", path: "/utvalget/vaktsjef/drikke", icon: AccessAlarmIcon },
  { title: "Sekretær", path: "/utvalget/sekretaer", icon: MenuBookIcon },
];

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [open, setOpen] = React.useState(router.pathname.includes("/utvalget") ? true : false);
  const theme = useTheme();

  // const handleClick = () => {
  //   setOpen(!open);
  // };

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

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    "&:before": { display: "block" },
  };

  // eslint-disable-next-line no-unused-vars
  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": { height: "100%", display: "flex", flexDirection: "column" },
      }}
    >
      <Box sx={{ mt: 5, mx: 2.5, px: 2.5 }}>
        <img src="/logo.svg" alt="logo" style={{ filter: "invert(1)" }} />
        <Typography variant="h6">Internsida v4</Typography>
      </Box>
      {/* <Divider /> */}
      <Box sx={{ mt: 5, mb: 3, mx: 2.5 }}>
        <Link href="/profil">
          <MuiLink underline="none">
            <AccountStyle>
              <Avatar src={"https://source.unsplash.com/200x200/?mugshot"} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {beboerId && beboere[beboerId]
                    ? beboere[beboerId].fornavn + " " + beboere[beboerId].etternavn
                    : "Laster..."}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Beboer
                </Typography>
              </Box>
            </AccountStyle>
          </MuiLink>
        </Link>
      </Box>

      <List component="div" disablePadding>
        {routes.map((item) => {
          const { title, path, icon } = item;

          return (
            <Link key={title} href={path}>
              <ListItemStyle
                sx={{
                  ...(router.pathname === path && activeRootStyle),
                }}
              >
                <ListItemIconStyle>{icon && <item.icon />}</ListItemIconStyle>
                <ListItemText disableTypography primary={title} />
              </ListItemStyle>
            </Link>
          );
        })}
        <ListSubheaderStyle>Admin</ListSubheaderStyle>
        {adminRoutes.map((item) => {
          const { title, path, icon } = item;

          return (
            <Link key={title} href={path}>
              <ListItemStyle
                sx={{
                  ...(router.pathname === path && activeRootStyle),
                }}
              >
                <ListItemIconStyle>{icon && <item.icon />}</ListItemIconStyle>
                <ListItemText disableTypography primary={title} />
              </ListItemStyle>
            </Link>
          );
        })}
      </List>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={props.isOpenSidebar}
          onClose={props.onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>

      <Hidden xlDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "rgb(0 0 0 / 25%)",
              border: "none",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
};

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
