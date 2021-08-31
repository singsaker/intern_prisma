import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
    <Grid container spacing={2} justify="center" alignItems="center">
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
