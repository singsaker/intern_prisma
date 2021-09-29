import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import _ from "lodash";

const NyListeSammendrag = (props) => {
  const [beboere, setBeboere] = useState([]);

  const compare = (a, b) => {
    let comparison = 0;

    if (a.ansiennitet < b.ansiennitet) {
      comparison = 1;
    } else if (a.ansiennitet > b.ansiennitet) {
      comparison = -1;
    } else {
      if (a.klassetrinn < b.klassetrinn) {
        comparison = 1;
      } else if (a.klassetrinn > b.klassetrinn) {
        comparison = -1;
      } else {
        const nr = [-1, 1];
        comparison = nr[Math.floor(Math.random() * nr.length)];
      }
    }

    return comparison;
  };

  useEffect(() => {
    if (beboere.length === 0) {
      setBeboere(props.valgtBeboere.sort(compare));
    }
  }, [props.valgtBeboere]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Typography style={{ margin: "10px 30px" }} variant="h5" color="primary">
          {props.tittel}
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item md={6} xs={12}>
          <TableContainer style={{ backgroundColor: "#011F26", maxHeight: "500px" }} component={Paper}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nr</TableCell>
                  <TableCell>Beboer</TableCell>
                  <TableCell>Ans</TableCell>
                  <TableCell>Trinn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beboere.map((beboer) => {
                  const nr = _.indexOf(beboere, beboer) + 1;

                  return (
                    <TableRow key={beboer.id}>
                      <TableCell>{nr}</TableCell>
                      <TableCell>
                        {beboer.mellomnavn
                          ? `${beboer.fornavn} ${beboer.mellomnavn} ${beboer.etternavn}`
                          : `${beboer.fornavn} ${beboer.etternavn}`}
                      </TableCell>
                      <TableCell>{beboer.ansiennitet}</TableCell>
                      <TableCell>{beboer.klassetrinn}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={6} xs={12}>
          <TableContainer style={{ backgroundColor: "#011F26", maxHeight: "500px" }} component={Paper}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Rom nr</TableCell>
                  <TableCell>Romtype</TableCell>
                  <TableCell>Nåværende beboer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.valgtRom.map((rom) => {
                  return (
                    <TableRow key={rom.id}>
                      <TableCell>{rom.navn}</TableCell>
                      <TableCell>{rom.romtype.navn}</TableCell>
                      <TableCell>
                        {rom.beboer.mellomnavn
                          ? `${rom.beboer.fornavn} ${rom.beboer.mellomnavn} ${rom.beboer.etternavn}`
                          : `${rom.beboer.fornavn} ${rom.beboer.etternavn}`}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NyListeSammendrag;
