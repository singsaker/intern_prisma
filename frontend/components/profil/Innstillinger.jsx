import React, { useState } from "react";

import { useSelector } from "react-redux";

// Components
import Kryss from "./Kryss";
import Varsler from "./Varsler";
import Epostliste from "./Epostliste";
import Passord from "./Passord";
import Info from "../BeboerInfoRediger";

// Material-UI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box } from "@material-ui/core";

const Instillinger = () => {
  const [tab, setTab] = useState("info");
  const beboer_id = useSelector((state) => state.auth.beboer_id);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Generelt" value="info" />
          <Tab label="Kryss" value="kryss" />
          <Tab label="Varsler" value="varsler" />
          <Tab label="Epostliste" value="epost" />
          <Tab label="Passord" value="passord" />
        </Tabs>
      </Box>
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "info"}>
              <Info beboer_id={beboer_id} />
            </Grid>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "kryss"}>
              <Kryss />
            </Grid>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "varsler"}>
              <Varsler />
            </Grid>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "epost"}>
              <Epostliste />
            </Grid>
            <Grid item style={{ width: "100%", margin: "20px" }} hidden={tab !== "passord"}>
              <Passord />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Instillinger;
