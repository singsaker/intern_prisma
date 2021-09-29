import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const NyListeBeboer = (props) => {
  const compare = (a, b) => {
    const objA = a.fornavn.toUpperCase() + a.mellomnavn.toUpperCase() + a.etternavn.toUpperCase();
    const objB = b.fornavn.toUpperCase() + b.mellomnavn.toUpperCase() + b.etternavn.toUpperCase();

    let comparison = 0;

    if (objA > objB) {
      comparison = 1;
    } else if (objA < objB) {
      comparison = -1;
    }

    return comparison;
  };

  const BeboerObjekt = (beboer) => {
    let v = props.valgt.indexOf(beboer.id) !== -1;

    return (
      <ListItem key={beboer.id} role="listitem" button onClick={() => props.handleVelg(beboer.id)}>
        <ListItemIcon>
          <Checkbox checked={v} />
        </ListItemIcon>
        <ListItemText
          id={beboer.id}
          primary={
            beboer.mellomnavn
              ? `${beboer.fornavn} ${beboer.mellomnavn} ${beboer.etternavn}`
              : `${beboer.fornavn} ${beboer.etternavn}`
          }
          secondary={beboer.rom && beboer.rom.navn + " - " + beboer.rom.romtype.navn}
        />
      </ListItem>
    );
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h6">Alle beboere - {props.venstre && props.venstre.length} stk</Typography>
        <Paper>
          <List dense component="div" role="list">
            {props.venstre &&
              props.venstre.length > 0 &&
              props.venstre.sort(compare).map((beboer) => BeboerObjekt(beboer))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={props.handleFlyttBeboerHoyre}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={props.handleFlyttBeboerVenstre}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6">Valgte beboere - {props.hoyre && props.hoyre.length} stk</Typography>

        <Paper>
          <Paper>
            <List dense component="div" role="list">
              {props.hoyre && props.hoyre.length > 0 && props.hoyre.sort(compare).map((beboer) => BeboerObjekt(beboer))}
            </List>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NyListeBeboer;
