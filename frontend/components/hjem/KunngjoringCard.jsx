import React from "react";
import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ReactTextFormat from "react-text-format";
import formaterDatoOgKlokke from "../../helpers/formaterDatoOgKlokke";

const KunngjoringCard = (props) => {
  const kunngjoring = useSelector((state) => state.kunngjoring[props.kunngjoringId]);
  const date = formaterDatoOgKlokke(new Date(kunngjoring.publisert));

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item></Grid>
          <Grid item>
            <CloseIcon onClick={() => props.toggleKunngjoringModal()} style={{ cursor: "pointer", margin: "8px" }} />
          </Grid>
        </Grid>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography color="secondary" variant="h5">
              {kunngjoring.tittel}
            </Typography>
            <Typography color="textSecondary">
              {date.dato} {date.klokkeslett} - {kunngjoring.beboer.fornavn}{" "}
              {kunngjoring.beboer.mellomnavn && kunngjoring.beboer.mellomnavn + " "} {kunngjoring.beboer.etternavn}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="pre"
              color="textSecondary"
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxHeight: "600px",
                overflowY: "auto",
              }}
            >
              <ReactTextFormat>{kunngjoring.tekst}</ReactTextFormat>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default KunngjoringCard;
