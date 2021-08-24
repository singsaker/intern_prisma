import React from "react";

// Materital-UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";

import { useSelector } from "react-redux";
import _ from "lodash";

const Storhybelliste = (props) => {
  const storhybellister = useSelector((state) => state.rom.storhybellister);
  const rom = useSelector((state) => state.rom.rom);
  const valgteRom = [];

  // Lager en liste med alle rom som allerede er valgt
  if (Number.isInteger(props.id) && storhybellister[props.id]) {
    for (let i = 0; i < storhybellister[props.id].valg.length; i++) {
      const nyttRom = storhybellister[props.id].valg[i].nyttRom;
      if (nyttRom !== null && Number.isInteger(nyttRom)) {
        valgteRom.push(nyttRom);
      }
    }
  }

  const compare = (a, b) => {
    let comparison = 0;
    const aValgt = _.findIndex(valgteRom, a.id) !== -1;
    const bValgt = _.findIndex(valgteRom, b.id) !== -1;

    if (aValgt && !bValgt) {
      comparison = 1;
    } else if (!aValgt && bValgt) {
      comparison = -1;
    }
    return comparison;
  };

  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item></Grid>
          <Grid item>
            <CloseIcon
              onClick={() => props.toggleListeModal()}
              style={{ cursor: "pointer", margin: "8px" }}
            />
          </Grid>
        </Grid>
        {storhybellister[props.id] ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                {storhybellister[props.id].navn}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TableContainer style={{ maxHeight: "440px" }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Rom</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {storhybellister[props.id].rom.sort(compare).map((r) => {
                      console.log(r);
                      console.log(_.findIndex(valgteRom, r.id));
                      return (
                        <TableRow key={r}>
                          <TableCell>{rom[r].navn}</TableCell>
                          <TableCell>
                            {rom[r].romtype.navn} {_.findIndex(valgteRom, r)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <TableContainer style={{ maxHeight: "440px" }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableCell></TableCell>
                    <TableCell>Beboer</TableCell>
                    <TableCell>Ans</TableCell>
                  </TableHead>
                  <TableBody>
                    {storhybellister[props.id].rekkefolge
                      .sort((a, b) => a.nummer - b.nummer)
                      .map((x) => {
                        return (
                          <TableRow key={x.nummer}>
                            <TableCell>{x.nummer}</TableCell>
                            <TableCell>
                              {x.beboer.fornavn} {x.beboer.mellomnavn + " "}
                              {x.beboer.etternavn}
                            </TableCell>
                            <TableCell>{x.beboer.ansiennitet}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" color="error">
            Noe gikk galt - fant ikke storhybellisten
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Storhybelliste;
