import "date-fns";
import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkole, getStudier } from "../src/actions/skole";
import { oppdaterBeboer, oppdaterGammelBeboer } from "../src/actions/beboer";
import { UPDATE_BEBOER } from "../src/query/beboer";
import { GET_STUDIER, GET_SKOLE } from "../src/query/studie";

import { useMutation, useQuery } from "@apollo/react-hooks";

// Material-UI
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  datepicker: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const BeboerInfoRediger = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const studier = useSelector((state) => Object.values(state.skole.studier));
  const skoler = useSelector((state) => Object.values(state.skole.skoler));
  const beboer = useSelector((state) => {
    if (props.gammelBeboer) {
      return state.beboer.gamleBeboere[props.beboer_id];
    } else if (props.perm) {
      return state.beboer.permliste[props.beboer_id];
    }
    return state.beboer.beboere[props.beboer_id];
  });
  const date = new Date();
  const [epost, setEpost] = useState("");
  const [tlf, setTlf] = useState("");
  const [studie_id, setStudieId] = useState("default");
  const [skole_id, setSkoleId] = useState("default");
  const [adresse, setAdresse] = useState("");
  const [klassetrinn, setKlassetrinn] = useState("default");
  const [fodselsdato, setFodselsdag] = useState(new Date());
  const [fornavn, setFornavn] = useState("");
  const [mellomnavn, setMellomnavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [postnummer, setPostnummer] = useState("");
  const [melding, setMelding] = useState("");
  const [vellykket, setVellykket] = useState(false);
  const [feilmelding, setFeilmelding] = useState(false);

  const studie = useQuery(GET_STUDIER, {
    onCompleted(data) {
      dispatch(getStudier(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const skole = useQuery(GET_SKOLE, {
    onCompleted(data) {
      dispatch(getSkole(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  let aarListe = [];
  let dagListe = [];

  useEffect(() => {
    if (beboer) {
      let bday = new Date();
      const deltDato = beboer.fodselsdato.split("-");
      bday.setMonth(deltDato[1] - 1);
      bday.setDate(deltDato[2]);
      bday.setFullYear(deltDato[0]);

      setEpost(beboer.epost);
      setTlf(beboer.telefon);
      setStudieId(beboer.studie ? beboer.studie.id : "default");
      setSkoleId(beboer.skole.id);
      setAdresse(beboer.adresse);
      setKlassetrinn(beboer.klassetrinn);
      setFodselsdag(bday);
      setFornavn(beboer.fornavn);
      setEtternavn(beboer.etternavn);
      setMellomnavn(beboer.mellomnavn);
      setPostnummer(beboer.postnummer ? beboer.postnummer : "");
    }
  }, [beboer]);

  for (let i = date.getFullYear(); i >= 1950; i--) {
    aarListe.push(i);
  }

  for (let j = 1; j <= 31; j++) {
    dagListe.push(j);
  }

  const [submitBeboer, { loading }] = useMutation(UPDATE_BEBOER, {
    variables: {
      id: props.beboer_id,
      epost,
      telefon: tlf,
      studie_id: Number(studie_id),
      skole_id: Number(skole_id),
      fodselsdato,
      adresse,
      postnummer: Number(postnummer),
      klassetrinn: Number(klassetrinn),
      fornavn,
      mellomnavn,
      etternavn,
    },
    onCompleted(data) {
      props.gammelBeboer
        ? dispatch(oppdaterGammelBeboer(data))
        : dispatch(oppdaterBeboer(data));

      setMelding("Beboer ble oppdatert!");
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const handleDateChange = (date) => {
    setFodselsdag(date);
  };

  if (studie.loading || skole.loading || loading)
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitBeboer();
      }}
    >
      <Grid container direction="column" spacing={2}>
        <TextField
          required
          id="fornavn_input"
          label="Fornavn"
          variant="outlined"
          value={fornavn}
          onChange={(e) => setFornavn(e.target.value)}
          style={{ margin: 8 }}
          fullWidth
        />
        <TextField
          id="mellomnavn_input"
          label="Mellomnavn"
          variant="outlined"
          value={mellomnavn}
          onChange={(e) => setMellomnavn(e.target.value)}
          style={{ margin: 8 }}
          fullWidth
        />
        <TextField
          required
          id="etternavn_input"
          label="Etternavn"
          variant="outlined"
          value={etternavn}
          onChange={(e) => setEtternavn(e.target.value)}
          style={{ margin: 8 }}
          fullWidth
        />
        <TextField
          required
          id="epost_input"
          label="Epost"
          variant="outlined"
          value={epost}
          onChange={(e) => setEpost(e.target.value)}
          style={{ margin: 8 }}
          fullWidth
        />
        <TextField
          id="telefon_input"
          label="Telefon"
          variant="outlined"
          value={tlf}
          onChange={(e) => setTlf(e.target.value)}
          style={{ margin: 8 }}
          fullWidth
        />
        <Grid item xs={12} container spacing={1}>
          <Grid item sm={8}>
            <TextField
              id="adresse_input"
              label="Adresse"
              variant="outlined"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              id="postnummer_input"
              label="Postnummer"
              variant="outlined"
              value={postnummer}
              onChange={(e) => setPostnummer(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.datepicker} justify="flex-start">
            <KeyboardDatePicker
              margin="normal"
              id="fodselsdag_input"
              label="Fødselsdag"
              format="dd/MM/yyyy"
              value={fodselsdato}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid>
          <FormControl className={classes.formControl}>
            <InputLabel id="skole_label">Skole</InputLabel>
            <Select
              labelId="skole_label"
              id="skole_input"
              value={skole_id}
              onChange={(e) => setSkoleId(e.target.value)}
            >
              {skoler.length > 0 ? (
                skoler
                  .sort((a, b) => {
                    const navn1 = a.navn.toUpperCase();
                    const navn2 = b.navn.toUpperCase();
                    if (navn1 < navn2) return -1;
                    if (navn1 > navn2) return 1;
                    return 0;
                  })
                  .map((skole) => {
                    return (
                      <MenuItem key={skole.id} value={skole.id}>
                        {skole.navn}
                      </MenuItem>
                    );
                  })
              ) : (
                <MenuItem>Laster inn...</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="studie_label">Studie</InputLabel>
            <Select
              labelId="studie_label"
              id="studie_input"
              value={studie_id}
              onChange={(e) => setStudieId(e.target.value)}
            >
              {studier.length > 0 ? (
                studier
                  .sort((a, b) => {
                    const navn1 = a.navn.toUpperCase();
                    const navn2 = b.navn.toUpperCase();
                    if (navn1 < navn2) return -1;
                    if (navn1 > navn2) return 1;
                    return 0;
                  })
                  .map((studie) => {
                    return (
                      <MenuItem key={studie.id} value={studie.id}>
                        {studie.navn}
                      </MenuItem>
                    );
                  })
              ) : (
                <MenuItem>Laster inn...</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="klasse_label">Klassetrinn</InputLabel>
            <Select
              labelId="klasse_label"
              id="klasse_input"
              value={klassetrinn}
              onChange={(e) => setKlassetrinn(e.target.value)}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
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
          {melding}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default BeboerInfoRediger;
