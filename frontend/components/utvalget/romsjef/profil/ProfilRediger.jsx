import React, { useState } from "react";

// Material-UI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";

// Components
import Info from "../../../BeboerInfoRediger";
import Admin from "./ProfilAdmin";
import Romhistorikk from "./ProfilRomhistorikk";
import Romflytt from "./ProfilRomflytt";

import { useSelector } from "react-redux";

const ProfilRediger = (props) => {
  const beboer = useSelector((state) => {
    if (props.perm) {
      return state.beboer.permliste[props.beboer_id];
    }
    return state.beboer.beboere[props.beboer_id];
  });
  const [tab, setTab] = useState("info");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  if (beboer) {
    return (
      <Card>
        <CardContent>
          <Grid container justify="space-between">
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
              <Tab label="Admin" value="admin" />
              <Tab label="Romflytt" value="romflytt" />
              <Tab label="Romhistorikk" value="romhistorikk" />
            </Tabs>
          </Paper>
          <Grid container>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "info"}>
              <Info perm={props.perm} beboer_id={props.beboer_id} />
            </Grid>

            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "admin"}>
              <Admin lukkModal={() => props.toggleBeboer()} beboer_id={props.beboer_id} perm={props.perm} />
            </Grid>

            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "romflytt"}>
              <Romflytt perm={props.perm} beboer_id={props.beboer_id} />
            </Grid>

            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "romhistorikk"}>
              <Romhistorikk perm={props.perm} beboer_id={props.beboer_id} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Grid container justify="center">
        <Grid item style={{ margin: "40px" }}>
          <Typography variant="h4">Ingen beboer :(</Typography>
        </Grid>
      </Grid>
    );
  }
};

export default ProfilRediger;
