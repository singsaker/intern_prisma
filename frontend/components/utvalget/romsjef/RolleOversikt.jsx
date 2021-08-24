import React from "react";

import { useSelector } from "react-redux";
import SpinnerComponent from "../../CustomSpinner";
import { useEffect } from "react";
import { useState } from "react";
import RolleOversiktPie from "./RolleOversiktPie";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const RolleOversikt = () => {
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [rolleData, setRolleData] = useState(null);

  useEffect(() => {
    if (beboere && rolleData === null) {
      let fullRegi = 0;
      let fullVakt = 0;
      let halv = 0;
      beboere.forEach((b) => {
        if (b.rolle.navn === "Full regi") {
          fullRegi++;
        } else if (b.rolle.navn === "Full vakt") {
          fullVakt++;
        } else {
          halv++;
        }
      });
      setRolleData([
        { id: "Full Regi", label: "Full Regi", value: fullRegi },
        { id: "Full Vakt", label: "Full Vakt", value: fullVakt },
        {
          id: "Halv regi/halv vakt",
          label: "Halv regi/halv vakt",
          value: halv,
        },
      ]);
    }
  }, [beboere]);

  if (!beboere || !rolleData) return <SpinnerComponent />;

  return (
    <Card variant="outlined" style={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="h2" color="primary">
          Rollefordeling
        </Typography>
        <Grid container justify="center" style={{ height: "200px" }}>
          <RolleOversiktPie data={rolleData} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RolleOversikt;
