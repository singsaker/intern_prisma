import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    height: 430,
    overflow: "auto",
    backgroundColor: "#011F26",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const NyListeRom = (props) => {
  const classes = useStyles();

  const RomObjekt = (rom) => {
    let v = props.valgt.indexOf(rom.id) !== -1;

    return (
      <ListItem
        key={rom.id}
        role="listitem"
        button
        onClick={() => props.handleVelg(rom.id)}
      >
        <ListItemIcon>
          <Checkbox checked={v} />
        </ListItemIcon>
        <ListItemText
          id={rom.id}
          primary={rom.navn}
          secondary={rom.romtype.navn}
        />

        {rom.beboer && (
          <Tooltip title={rom.beboer.fornavn + " " + rom.beboer.etternavn}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
          </Tooltip>
        )}
      </ListItem>
    );
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h6">
          Alle rom - {props.venstre && props.venstre.length} stk
        </Typography>
        <Paper className={classes.paper}>
          <List dense component="div" role="list">
            {props.venstre &&
              props.venstre.length > 0 &&
              props.venstre
                .sort((a, b) => {
                  return Number(a.navn) - Number(b.navn);
                })
                .map((r) => RomObjekt(r))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={props.handleFlyttRomHoyre}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={props.handleFlyttRomVenstre}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6">
          Valgte rom - {props.hoyre && props.hoyre.length} stk
        </Typography>

        <Paper className={classes.paper}>
          <Paper className={classes.paper}>
            <List dense component="div" role="list">
              {props.hoyre &&
                props.hoyre.length > 0 &&
                props.hoyre
                  .sort((a, b) => {
                    return Number(a.navn) - Number(b.navn);
                  })
                  .map((r) => RomObjekt(r))}
            </List>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NyListeRom;
