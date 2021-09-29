import React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const NyListeRom = (props) => {
  const RomObjekt = (rom) => {
    let v = props.valgt.indexOf(rom.id) !== -1;

    return (
      <ListItem key={rom.id} role="listitem" button onClick={() => props.handleVelg(rom.id)}>
        <ListItemIcon>
          <Checkbox checked={v} />
        </ListItemIcon>
        <ListItemText id={rom.id} primary={rom.navn} secondary={rom.romtype.navn} />

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
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="h6">Alle rom - {props.venstre && props.venstre.length} stk</Typography>
        <Paper>
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
          <Button variant="outlined" size="small" onClick={props.handleFlyttRomHoyre} aria-label="move selected right">
            &gt;
          </Button>
          <Button variant="outlined" size="small" onClick={props.handleFlyttRomVenstre} aria-label="move selected left">
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6">Valgte rom - {props.hoyre && props.hoyre.length} stk</Typography>

        <Paper>
          <Paper>
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
