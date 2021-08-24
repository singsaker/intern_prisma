import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  OPPDATER_STUDIE,
  SLETT_STUDIE,
  GET_STUDIER,
  LAG_STUDIE,
} from "../../../src/query/studie";
import {
  oppdaterStudie,
  slettStudie,
  getStudier,
  lagStudie,
} from "../../../src/actions/skole";

// Material-UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const StudieAdmin = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const studier = useSelector((state) => state.skole.studier);
  const [studieNavn, setStudieNavn] = useState({});
  const [vellykket, setVellykket] = useState(false);
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");
  const [nyttStudie, setNyttStudie] = useState("");

  const studierQuery = useQuery(GET_STUDIER, {
    onCompleted(data) {
      dispatch(getStudier(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (Object.keys(studier).length > 0) {
      setStudieNavn(studier);
    }
  }, [studier]);

  const [oppdaterStudieMutation] = useMutation(OPPDATER_STUDIE, {
    onCompleted(data) {
      dispatch(oppdaterStudie(data));
      setMelding("Endringene ble lagret!");
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const [lagStudieMutation] = useMutation(LAG_STUDIE, {
    onCompleted(data) {
      dispatch(lagStudie(data));
      setMelding("Nytt studie ble lagt til!");
      setVellykket(true);
      setNyttStudie("");
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
    variables: {
      navn: nyttStudie,
    },
  });

  const [slettStudieMutation] = useMutation(SLETT_STUDIE, {
    onCompleted(data) {
      dispatch(slettStudie(data));
      setMelding("Studie ble slettet!");
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const handleStudieChange = (id, navn) => {
    setStudieNavn({
      ...studieNavn,
      [id]: { id: id, navn: navn },
    });
  };

  const compare = (a, b) => {
    let objA = a.navn.toUpperCase();
    let objB = b.navn.toUpperCase();

    let comparison = 0;

    if (objA > objB) {
      comparison = 1;
    } else if (objA < objB) {
      comparison = -1;
    }

    return comparison;
  };

  return (
    <Grid container className={classes.root}>
      <Grid container justify="flex-end" item xs={12}>
        <CloseIcon
          onClick={() => props.toggleStudieAdmin()}
          style={{ cursor: "pointer", margin: "8px" }}
        />
      </Grid>
      <Grid item md={8} xs={12}>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Studie</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Slett?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studierQuery.loading || Object.keys(studieNavn).length < 1 ? (
                <TableRow>
                  <TableCell>
                    <Grid container justify="center">
                      <CircularProgress />
                    </Grid>
                  </TableCell>
                </TableRow>
              ) : (
                Object.values(studier)
                  .sort(compare)
                  .map((studie) => {
                    if (!studieNavn[studie.id]) return;

                    return (
                      <TableRow key={studie.id}>
                        <TableCell>
                          <InputBase
                            value={studieNavn[studie.id].navn}
                            onChange={(e) =>
                              handleStudieChange(studie.id, e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          {studier[studie.id].navn !=
                            studieNavn[studie.id].navn && (
                            <Button
                              onClick={() =>
                                oppdaterStudieMutation({
                                  variables: {
                                    id: studie.id,
                                    navn: studieNavn[studie.id].navn,
                                  },
                                })
                              }
                              variant="contained"
                              color="primary"
                            >
                              Lagre
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() =>
                              slettStudieMutation({
                                variables: {
                                  id: studie.id,
                                },
                              })
                            }
                            color="primary"
                            aria-label="slett"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={4} xs={12} style={{ padding: "8px" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            lagStudieMutation();
          }}
        >
          <Grid container spacing={1}>
            <Grid item>
              <TextField
                value={nyttStudie}
                onChange={(e) => setNyttStudie(e.target.value)}
                label="Nytt studie"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                type="submit"
              >
                Legg til
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar
        open={vellykket}
        autoHideDuration={6000}
        onClose={() => setVellykket(false)}
      >
        <Alert onClose={() => setVellykket(false)} severity="success">
          {melding}
        </Alert>
      </Snackbar>
      <Snackbar
        open={feilmelding}
        autoHideDuration={6000}
        onClose={() => setFeilmelding(false)}
      >
        <Alert onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default StudieAdmin;
