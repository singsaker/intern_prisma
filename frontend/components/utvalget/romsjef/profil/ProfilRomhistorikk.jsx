import React, { useState } from "react";

// Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import formaterDato from "../../../../helpers/formaterDato";

import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import { GET_ALLE_ROM } from "../../../../src/query/rom";
import { getAlleRom } from "../../../../src/actions/rom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Romhistorikk = (props) => {
  const dispatch = useDispatch();
  const romhistorikk = useSelector((state) => {
    if (props.gammelBeboer) {
      return state.beboer.gamleBeboere[props.beboer_id].romhistorikk;
    } else if (props.perm) {
      return state.beboer.permliste[props.beboer_id].romhistorikk;
    }
    return state.beboer.beboere[props.beboer_id].romhistorikk;
  });
  const rom = useSelector((state) => state.rom.rom);
  const [melding, setMelding] = useState("");
  const [feilmelding, setFeilmelding] = useState(false);

  const romQuery = useQuery(GET_ALLE_ROM, {
    onCompleted(data) {
      dispatch(getAlleRom(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rom</TableCell>
            <TableCell>Romtype</TableCell>
            <TableCell>Flyttet inn</TableCell>
            <TableCell>Flyttet ut</TableCell>
          </TableRow>
        </TableHead>

        {rom.length < 1 || romQuery.loading ? (
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Laster inn..
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {romhistorikk &&
              romhistorikk.map((historie) => (
                <TableRow key={Object.values(historie)}>
                  <TableCell component="th" scope="row">
                    {rom[historie.romId] && rom[historie.romId].navn}
                  </TableCell>
                  <TableCell>{rom[historie.romId] && rom[historie.romId].romtype.navn}</TableCell>
                  <TableCell>{formaterDato(historie.innflyttet)}</TableCell>
                  <TableCell>{historie.utflyttet && formaterDato(historie.utflyttet)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
      <Snackbar open={feilmelding} autoHideDuration={6000} onClose={() => setFeilmelding(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default Romhistorikk;
