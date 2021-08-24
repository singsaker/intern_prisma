import React, { useState, useEffect } from "react";

// Components
import Spinner from "../CustomSpinner";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getBeboerEpostPrefs,
  oppdaterBeboerEpostPrefs,
} from "../../src/actions/beboer";
import {
  UPDATE_BEBOER_EPOST_PREFS,
  GET_BEBOER_EPOST_PREFS,
} from "../../src/query/beboer";

import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { isNumber } from "lodash";

// Material-UI
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";

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

const Varsler = () => {
  const dispatch = useDispatch();
  const beboer_id = useSelector((state) => state.auth.beboer_id);
  const prefs = useSelector((state) => state.beboer.epostPrefs[beboer_id]);
  const [tildelt, setTildelt] = useState(false);
  const [snart, setSnart] = useState(false);
  const [bytte, setBytte] = useState(false);
  const [utleie, setUtleie] = useState(false);
  const [barvakt, setBarvakt] = useState(false);
  const [vellykket, setVellykket] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (prefs) {
      setTildelt(prefs.tildelt);
      setSnart(prefs.snart_vakt);
      setBytte(prefs.bytte);
      setUtleie(prefs.utleie);
      setBarvakt(prefs.barvakt);
    }
  }, [prefs]);

  // Henter epostliste-preferanser for aktuell beboer:
  const [hentEpostPrefs, hentPrefsState] = useLazyQuery(
    GET_BEBOER_EPOST_PREFS,
    {
      variables: { id: beboer_id },
      onCompleted(data) {
        dispatch(getBeboerEpostPrefs(data));
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    if (isNumber(beboer_id) && !prefs) {
      hentEpostPrefs();
    }
  }, [beboer_id]);

  // Oppdaterer epostliste-preferanser for aktuell beboer:
  const [submitPrefs, submitPrefsState] = useMutation(
    UPDATE_BEBOER_EPOST_PREFS,
    {
      variables: {
        id: beboer_id,
        tildelt: tildelt,
        snartVakt: snart,
        bytte: bytte,
        utleie: utleie,
        barvakt: barvakt,
      },
      onCompleted(data) {
        setVellykket(true);
        dispatch(oppdaterBeboerEpostPrefs(data));
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  if (!prefs || submitPrefsState.loading || hentPrefsState.loading)
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
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Få en varsel på epost...</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={snart}
                    onChange={() => setSnart(!snart)}
                    name="snart"
                  />
                }
                label="24 timer før neste vakt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={barvakt}
                    onChange={() => setBarvakt(!barvakt)}
                    name="barvakt"
                  />
                }
                label="24 timer før neste barvakt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tildelt}
                    onChange={() => setTildelt(!tildelt)}
                    name="tildelt"
                  />
                }
                label="når du har blitt tildelt en vakt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bytte}
                    onChange={() => setBytte(!bytte)}
                    name="tildelt"
                  />
                }
                label="når noen vil bytte eller gi bort en vakt"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={utleie}
                    onChange={() => setUtleie(!utleie)}
                    name="tildelt"
                  />
                }
                label="når kosesjef har planlagt et utleie"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid container item direction="row" justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            type="submit"
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

export default Varsler;
