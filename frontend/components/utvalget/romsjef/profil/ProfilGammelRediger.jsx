import React, { useState } from "react";

// Material-UI
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

// Components
import Info from "../../../BeboerInfoRediger";
import Romhistorikk from "./ProfilRomhistorikk";

import { useSelector } from "react-redux";

const ProfilRediger = (props) => {
  const beboer = useSelector((state) => state.beboer.gamleBeboere[props.beboer_id]);
  const [tab, setTab] = useState("info");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  if (beboer) {
    return (
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography color="primary" variant="h6">
                {beboer.fornavn} {beboer.mellomnavn + " "}
                {beboer.etternavn}
              </Typography>
            </Grid>
            <Grid item>
              <CloseIcon onClick={() => props.toggleBeboer()} style={{ cursor: "pointer", margin: "8px" }} />
            </Grid>
          </Grid>
          <Paper style={{ backgroundColor: "#011F26" }}>
            <Tabs
              value={tab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Info" value="info" />
              <Tab label="Romhistorikk" value="romhistorikk" />
            </Tabs>
          </Paper>
          <Grid container>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "info"}>
              <Info beboer_id={props.beboer_id} gammelBeboer={true} />
            </Grid>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "romhistorikk"}>
              <Romhistorikk beboer_id={props.beboer_id} gammelBeboer={true} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Grid container justifyContent="center">
        <Grid item style={{ margin: "40px" }}>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    );
  }
};

export default ProfilRediger;
