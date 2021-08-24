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
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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
  const classes = useStyles();
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

  if (submitPrefsState.loading || hentPrefsState.loading || !prefs)
    return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitPrefs();
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Krysseliste</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={resep}
                    onChange={() => setResep(!resep)}
                    name="resep"
                  />
                }
                label="Jeg ønsker å stå på krysselista i resepsjonen"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pinkode}
                    onChange={() => setPinkode(!pinkode)}
                    name="pinkode"
                  />
                }
                label="Pinkode på krysselista"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vinkjeller}
                    onChange={() => setVinkjeller(!vinkjeller)}
                    name="binkjeller"
                  />
                }
                label="Jeg ønsker å stå på krysselista i vinkjelleren"
              />
            </FormGroup>
            <FormHelperText>
              Kryssing i vinkjeller krever pinkode
            </FormHelperText>
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
        <Grid item container direction="row" justify="flex-end">
          <Button
            variant="contained"
            type="submit"
            size="large"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Lagre
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={vellykket}
        autoHideDuration={6000}
        onClose={() => setVellykket(false)}
      >
        <Alert onClose={() => setVellykket(false)} severity="success">
          Endringene ble lagret!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Kryss;
