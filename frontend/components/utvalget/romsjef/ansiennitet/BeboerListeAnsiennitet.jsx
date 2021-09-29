import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBeboere } from "../../../../src/actions/beboer";
import { GET_BEBOERE } from "../../../../src/query/beboer";

// Misc
import _ from "lodash";
import { useQuery } from "@apollo/client";

// Material UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const BeboerListe = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);
  const [melding, setMelding] = useState("");
  const [feilmelding, setFeilmelding] = useState(false);

  const { loading } = useQuery(GET_BEBOERE, {
    onCompleted(data) {
      dispatch(getBeboere(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleSorter = (kolonne) => {
    if (kolonne === sorter) {
      setAsc(!asc);
    } else {
      setAsc(true);
    }
    setSorter(kolonne);
  };

  const erValgt = (id) => props.valgt.indexOf(id) !== -1;

  // Sorterer etter valgt kolonne:
  const compare = (a, b) => {
    let objA;
    let objB;

    if (sorter === "navn") {
      objA = a.fornavn.toUpperCase() + a.mellomnavn.toUpperCase() + a.etternavn.toUpperCase();
      objB = b.fornavn.toUpperCase() + b.mellomnavn.toUpperCase() + b.etternavn.toUpperCase();
    } else {
      objA = _.get(a, sorter).toUpperCase();
      objB = _.get(b, sorter).toUpperCase();
    }

    let comparison = 0;
    if (asc) {
      if (objA > objB) {
        comparison = 1;
      } else if (objA < objB) {
        comparison = -1;
      }
    } else {
      if (objA > objB) {
        comparison = -1;
      } else if (objA < objB) {
        comparison = 1;
      }
    }

    return comparison;
  };

  if (loading)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={beboere.length === props.valgt.length}
                  checked={beboere.length === props.valgt.length}
                  onChange={(e) => props.handleVelgAlle(e)}
                />
              </TableCell>
              <TableCell>Navn</TableCell>
              <TableCell>Diff</TableCell>
              <TableCell>Ansiennitet</TableCell>
              <TableCell>Verv</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beboere.sort(compare).map((beboer) => {
              const erRadValgt = erValgt(beboer.id);
              const differanse = props.ansiennitet[beboer.id] - beboer.ansiennitet;
              let diffStyle = {};

              if (differanse > 0) {
                diffStyle = { color: "yellow" };
              } else if (differanse < 0) {
                diffStyle = { color: "red" };
              }
              return (
                <TableRow
                  hover
                  role="checkbox"
                  key={beboer.id}
                  tabIndex={-1}
                  aria-checked={erRadValgt}
                  selected={erRadValgt}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={erRadValgt} onClick={() => props.handleVelg(beboer.id)} />
                  </TableCell>
                  <TableCell style={{ cursor: "pointer" }} onClick={() => props.handleVelg(beboer.id)}>
                    <Typography variant="subtitle1">
                      {beboer.mellomnavn
                        ? `${beboer.fornavn} ${beboer.mellomnavn} ${beboer.etternavn}`
                        : `${beboer.fornavn} ${beboer.etternavn}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={diffStyle}>{differanse}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textPrimary">
                      <TextField
                        type="number"
                        value={props.ansiennitet[beboer.id]}
                        onChange={(e) => props.handleAnsiennitetChange(beboer.id, e.target.value)}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <List dense>
                      {beboer.verv.map((v) => (
                        <ListItemText key={v.id} primary={v.navn} />
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => props.handleLagreValgt(beboer.id)} variant="contained" color="primary">
                      Oppdater
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={feilmelding} autoHideDuration={6000} onClose={() => setFeilmelding(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default BeboerListe;
