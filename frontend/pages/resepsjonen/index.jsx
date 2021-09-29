import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Grid,
  SpeedDial,
  SpeedDialAction,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  SpeedDialIcon,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { useState } from "react";
import ResepLayout from "../../components/resepsjonen/ResepLayout";
import { alpha, useTheme } from "@mui/material/styles";

// Fetch Data
import { GET_BEBOERE } from "../../src/query/beboer";
import { useQuery } from "@apollo/client";

// Misc
import _ from "lodash";
import dateFormat from "dateformat";

import SwipeableEdgeDrawer from "../../components/resepsjonen/SwipableDrawer";
import Spinner from "../../components/resepsjonen/Spinner";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import HomeIcon from "@mui/icons-material/Home";
import { GET_KRYSS } from "../../src/query/kryss";

const actions = [
  { icon: <HomeIcon />, name: "Krysseliste" },
  { icon: <FileCopyIcon />, name: "Historikk" },
  { icon: <SaveIcon />, name: "Påfyll" },
  { icon: <PrintIcon />, name: "Signering" },
];

const Resepsjonen = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const [alignment, setAlignment] = useState();
  const { data, loading, error } = useQuery(GET_BEBOERE);
  const {
    data: dataKryss,
    loading: loadingKryss,
    error: errorKryss,
  } = useQuery(GET_KRYSS, {
    variables: {
      antall: 20,
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading || loadingKryss) {
    return <Spinner />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (errorKryss) {
    console.error(errorKryss);
    return null;
  }

  const beboere = data.hentBeboere;

  const handleSortChange = (event, newValue) => {
    setAlignment(newValue);
    setSelectedUser(null);
  };

  const activeRootStyle = {
    color: "secondary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
    "&:before": { display: "block" },
  };

  return (
    <>
      <ResepLayout>
        <Grid container spacing={5}>
          <Grid item xs>
            <Box py={4}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Krysseliste
              </Typography>
              <ToggleButtonGroup color="standard" value={alignment} exclusive onChange={handleSortChange}>
                {_.uniq(beboere.map((a) => a.fornavn[0]))
                  .sort()
                  .map((letter, i) => (
                    <ToggleButton key={i} value={letter}>
                      {letter}
                    </ToggleButton>
                  ))}
              </ToggleButtonGroup>
            </Box>
            <Grid container spacing={3}>
              {beboere
                .filter((a) => (alignment == undefined ? true : a.fornavn[0] == alignment))
                .sort((a, b) => {
                  if (a.fornavn < b.fornavn) {
                    return -1;
                  }
                  if (a.fornavn > b.fornavn) {
                    return 1;
                  }
                  return 0;
                })
                .map((row) => {
                  const { id, fornavn, mellomnavn, etternavn, rom } = row;

                  return (
                    <Grid item xs={3} key={id}>
                      <Card
                        sx={{
                          ...(selectedUser == id && activeRootStyle),
                        }}
                      >
                        <CardActionArea
                          onClick={() => (selectedUser == id ? setSelectedUser(null) : setSelectedUser(id))}
                          sx={{}}
                        >
                          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 2 }}>
                            <Box
                              sx={{ width: 1 / 3, height: 110, objectFit: "cover" }}
                              component="img"
                              alt="profile"
                              src={"https://i.pravatar.cc/150?u=" + id}
                            />
                            <Box py={2} pr={2}>
                              <Typography variant="subtitle2" gutterBottom>
                                {mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`}
                              </Typography>
                              <Chip label={"#" + rom?.navn} size="small" />
                            </Box>
                          </Stack>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Divider sx={{ ml: 4 }} orientation="vertical" flexItem />
          <Grid item xs={3}>
            <Box py={4}>
              <Typography variant="h4" gutterBottom>
                Nylige kryss
              </Typography>
              <List sx={{ mb: 1 }}>
                {dataKryss.hentKryss
                  .slice(0)
                  .reverse()
                  .map((item, id) => (
                    <ListItem key={id} disableGutters>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle2" sx={{ color: "grey.500" }}>
                            {item.beboer.fornavn} {item.beboer.etternavn} krysset{" "}
                            <Typography variant="subtitle2" component="span" sx={{ color: "grey.300" }}>
                              {item.antall} {item.drikke.navn}
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Chip
                            variant="outlined"
                            label={dateFormat(new Date(parseInt(item.tid)), "paddedShortDate")}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </ResepLayout>
      <SwipeableEdgeDrawer beboerId={selectedUser} />
      <Box
        sx={{
          position: "fixed",
          height: "100%",
          width: 20,
          right: 0,
          top: 0,
        }}
      >
        {/* <Backdrop open={open} /> */}
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
};

export default Resepsjonen;
