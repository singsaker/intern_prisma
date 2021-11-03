import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { oppdaterPinkodeBruker, getPinkodeDenneBeboer } from "../../src/actions/beboer";
import { UDPATE_PINKODE_BRUKER, GET_PINKODE_BRUKER } from "../../src/query/beboer";

// Components
import Spinner from "../CustomSpinner";

import { useMutation, useQuery } from "@apollo/client";

// Material-UI
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Kryss = () => {
  const dispatch = useDispatch();
  const pinkode = useSelector((state) => state.beboer.pinkode);
  const [resep, setResep] = useState(false);
  const [vinkjeller, setVinkjeller] = useState(false);
  const [kode, setKode] = useState("");
  const [melding, setMelding] = useState("");
  const [vellykket, setVellykket] = useState(false);
  const [visAlert, setVisAlert] = useState(false);

  useEffect(() => {
    if (pinkode.kode) {
      setResep(pinkode.resep);
      setVinkjeller(pinkode.vinkjeller);
      setKode(pinkode.kode);
    }
  }, [pinkode]);

  // Henter pinkode-informasjon til aktuell beboer
  const hentPinkodeState = useQuery(GET_PINKODE_BRUKER, {
    onCompleted(data) {
      dispatch(getPinkodeDenneBeboer(data));
    },
    onError(error) {
      setMelding(error.message);
      setVellykket(false);
      setVisAlert(true);
    },
  });

  const [oppdaterPinkode, oppdaterPinkodeState] = useMutation(UDPATE_PINKODE_BRUKER, {
    variables: {
      kode: kode,
      resep: resep,
      vinkjeller: vinkjeller,
    },
    onCompleted(data) {
      dispatch(oppdaterPinkodeBruker(data));
      setMelding("Endringer ble lagret!");
      setVellykket(true);
      setVisAlert(true);
    },
    onError(error) {
      setMelding(error.message);
      setVellykket(false);
      setVisAlert(true);
    },
  });

  if (hentPinkodeState.loading || oppdaterPinkodeState.loading) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        oppdaterPinkode();
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Krysseliste</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={resep} onChange={() => setResep(!resep)} name="resep" />}
                label="Jeg ønsker å stå på krysselista i resepsjonen"
              />

              <FormControlLabel
                control={
                  <Checkbox checked={vinkjeller} onChange={() => setVinkjeller(!vinkjeller)} name="binkjeller" />
                }
                label="Jeg ønsker å stå på krysselista i vinkjelleren"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid container item direction="row" spacing={2}>
          <Grid item>
            <TextField
              required={resep || vinkjeller}
              id="outlined-required"
              label="Pinkode"
              value={kode}
              variant="outlined"
              disabled={!resep && !vinkjeller}
              onChange={(e) => setKode(e.target.value)}
            />
            <FormHelperText>Du må ha pinkode for å kunne krysse</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container direction="row" justifyContent="flex-end">
          <Button variant="contained" type="submit" size="large" color="primary" startIcon={<SaveIcon />}>
            Lagre
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={visAlert} autoHideDuration={6000} onClose={() => setVisAlert(false)}>
        <Alert onClose={() => setVisAlert(false)} severity={vellykket ? "success" : "error"}>
          {melding}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Kryss;
