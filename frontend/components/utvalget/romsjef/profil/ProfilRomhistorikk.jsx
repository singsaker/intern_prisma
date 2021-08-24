import React, { useEffect, useState } from "react";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import formaterDato from "../../../../helpers/formaterDato";

import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALLE_ROM } from "../../../../src/query/rom";
import { getAlleRom } from "../../../../src/actions/rom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const Romhistorikk = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
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
      <Table className={classes.table} size="small">
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
                  <TableCell>
                    {rom[historie.romId] && rom[historie.romId].romtype.navn}
                  </TableCell>
                  <TableCell>{formaterDato(historie.innflyttet)}</TableCell>
                  <TableCell>
                    {historie.utflyttet && formaterDato(historie.utflyttet)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
      <Snackbar
        open={feilmelding}
        autoHideDuration={6000}
        onClose={() => setFeilmelding(false)}
      >
        <Alert onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default Romhistorikk;
