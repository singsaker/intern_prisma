import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBeboerPrefs, oppdaterBeboerPrefs } from "../../src/actions/beboer";
import { UPDATE_PREFS, GET_BEBOER_PREFS } from "../../src/query/beboer";

// Components
import Spinner from "../CustomSpinner";

import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { isNumber } from "lodash";

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
import Alert from "@mui/material/Alert";

const Kryss = () => {
  const dispatch = useDispatch();
  const beboer_id = useSelector((state) => state.auth.beboer_id);
  const prefs = useSelector((state) => state.beboer.prefs[beboer_id]);
  const [resep, setResep] = useState(false);
  const [vinkjeller, setVinkjeller] = useState(false);
  const [pinkode, setPinkode] = useState(false);
  const [pinkodeResep, setPinkodeResep] = useState("");
  const [pinkodeVinkjeller, setPinkodeVinkjeller] = useState("");
  const [pinResep, setPinResep] = useState(null);
  const [pinVin, setPinVin] = useState(null);
  const [vellykket, setVellykket] = useState(false);

  useEffect(() => {
    if (prefs) {
      setResep(prefs.resepp);
      setVinkjeller(prefs.vinkjeller);
      setPinkode(prefs.pinboo);
      setPinkodeResep(prefs.pinkode === null ? "" : prefs.pinkode);
      setPinkodeVinkjeller(prefs.vinpin === null ? "" : prefs.vinpin);
    }
  }, [prefs]);

  useEffect(() => {
    if (pinkodeResep !== "") {
      setPinResep(Number(pinkodeResep));
    } else {
      setPinResep(null);
    }

    if (pinkodeVinkjeller !== "") {
      setPinVin(Number(pinkodeResep));
    } else {
      setPinVin(null);
    }
  }, [pinkodeResep, pinkodeVinkjeller]);

  // Henter krysseliste-preferansene til aktuell beboer
  const [hentPrefs, hentPrefsState] = useLazyQuery(GET_BEBOER_PREFS, {
    variables: {
      beboerId: beboer_id,
    },
    onCompleted(data) {
      dispatch(getBeboerPrefs(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isNumber(beboer_id) && !prefs) {
      hentPrefs();
    }
  }, [beboer_id]);

  // Oppdaterer krysseliste-preferansene til aktuell beboer
  const [submitPrefs, submitPrefsState] = useMutation(UPDATE_PREFS, {
    variables: {
      id: beboer_id,
      pinboo: pinkode,
      pinkode: pinResep,
      resepp: resep,
      vinkjeller: vinkjeller,
      vinpin: pinVin,
    },
    onCompleted(data) {
      setVellykket(true);
      dispatch(oppdaterBeboerPrefs(data));
    },
    onError(error) {
      setVellykket(false);
      console.log(error);
    },
  });

  if (submitPrefsState.loading || hentPrefsState.loading || !prefs) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitPrefs();
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
                control={<Checkbox checked={pinkode} onChange={() => setPinkode(!pinkode)} name="pinkode" />}
                label="Pinkode på krysselista"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={vinkjeller} onChange={() => setVinkjeller(!vinkjeller)} name="binkjeller" />
                }
                label="Jeg ønsker å stå på krysselista i vinkjelleren"
              />
            </FormGroup>
            <FormHelperText>Kryssing i vinkjeller krever pinkode</FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item direction="row" spacing={2}>
          <Grid item>
            <TextField
              required={pinkode}
              id="outlined-required"
              label="Pinkode resep"
              defaultValue={pinkodeResep}
              variant="outlined"
              disabled={!pinkode}
              onChange={(e) => setPinkodeResep(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required={vinkjeller}
              id="outlined-required"
              label="Pinkode vinkjeller"
              defaultValue={pinkodeVinkjeller}
              variant="outlined"
              disabled={!vinkjeller}
              onChange={(e) => setPinkodeVinkjeller(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item container direction="row" justifyContent="flex-end">
          <Button variant="contained" type="submit" size="large" color="primary" startIcon={<SaveIcon />}>
            Lagre
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={vellykket} autoHideDuration={6000} onClose={() => setVellykket(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setVellykket(false)} severity="success">
          Endringene ble lagret!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Kryss;
