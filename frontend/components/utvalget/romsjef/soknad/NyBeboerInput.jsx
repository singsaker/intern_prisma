import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALLE_ROM } from "../../../../src/query/rom";
import { getAlleRom } from "../../../../src/actions/rom";
import { GET_SKOLE, GET_STUDIER } from "../../../../src/query/studie";
import { getSkole, getStudier } from "../../../../src/actions/skole";
import { GET_ROLLER } from "../../../../src/query/regi";
import { getRoller } from "../../../../src/actions/regi";
import { lagBeboer } from "../../../../src/actions/beboer";
import { LAG_BEBOER } from "../../../../src/query/beboer";
import { isBoolean } from "lodash";

import validerEpost from "../../../../helpers/validerEpost";

// Material-UI
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  datepicker: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const NyBeboerInput = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = router.query;
  const soknader = useSelector((state) => state.soknader);
  const rom = useSelector((state) => Object.values(state.rom.rom));
  const studier = useSelector((state) => Object.values(state.skole.studier));
  const skoler = useSelector((state) => Object.values(state.skole.skoler));
  const roller = useSelector((state) => Object.values(state.regi.roller));

  const [fornavn, setFornavn] = useState("");
  const [etternavn, setEtternavn] = useState("");
  const [mellomnavn, setMellomnavn] = useState("");
  const [fodselsdato, setFodselsdato] = useState(new Date());
  const [kjonn, setKjonn] = useState("default");
  const [adresse, setAdresse] = useState("");
  const [postnummer, setPostnummer] = useState("");
  const [telefon, setTelefon] = useState("");
  const [epost, setEpost] = useState("");
  const [skole, setSkole] = useState("default");
  const [studie, setStudie] = useState("default");
  const [klasse, setKlasse] = useState(1);
  const [alkDep, setAlkDep] = useState(false);
  const [rolle, setRolle] = useState("default");
  const [valgtRom, setValgtRom] = useState("default");

  const [lagBeboerDialog, setLagBeboerDialog] = useState(false);

  const [vellykket, setVellykket] = useState(false);
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");

  const handleDateChange = (date) => {
    setFodselsdato(date);
  };

  useQuery(GET_ALLE_ROM, {
    onCompleted(data) {
      dispatch(getAlleRom(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  useQuery(GET_STUDIER, {
    onCompleted(data) {
      dispatch(getStudier(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  useQuery(GET_SKOLE, {
    onCompleted(data) {
      dispatch(getSkole(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  useQuery(GET_ROLLER, {
    onCompleted(data) {
      dispatch(getRoller(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  // Setter de faste verdiene som søkeren har fyllt inn:
  useEffect(() => {
    if (
      soknader &&
      soknader[params.sem] &&
      soknader[params.sem][params.params[0]]
    ) {
      const soknad = soknader[params.sem][params.params[0]];
      const navn = soknad.navn.split(" ");

      setMellomnavn("");
      for (let i = 0; i < navn.length; i++) {
        if (i == 0) {
          setFornavn(navn[i]);
        } else if (i === navn.length - 1) {
          setEtternavn(navn[i]);
        } else {
          setMellomnavn((prevMellomnavn) => prevMellomnavn + " " + navn[i]);
        }
      }
      setAdresse(soknad.adresse);
      setEpost(soknad.epost);
      setTelefon(soknad.telefon);
    }
  }, [soknader]);

  const [lagBeboerMutation] = useMutation(LAG_BEBOER, {
    onCompleted(data) {
      dispatch(lagBeboer(data));
      setMelding("Beboer er lagt til!");
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const handleLagBeboer = () => {
    setLagBeboerDialog(false);

    if (fornavn.length < 1 || etternavn.length < 1) {
      setMelding("Fullt navn må fylles inn!");
      setFeilmelding(true);
    } else if (!validerEpost(epost)) {
      setMelding("Ikke gyldig epost!");
      setFeilmelding(true);
    } else if (studie === "default" || skole === "default") {
      setMelding("Skole eller studie er ikke fyllt inn!");
      setFeilmelding(true);
    } else if (rolle === "default") {
      setMelding("Rolle er ikke fyllt inn!");
      setFeilmelding(true);
    } else if (valgtRom === "default") {
      setMelding("Det er ikke tildelt noe rom!");
      setFeilmelding(true);
    } else if (!isBoolean(kjonn)) {
      setMelding("Det er ikke valgt noe kjønn!");
      setFeilmelding(true);
    } else {
      lagBeboerMutation({
        variables: {
          fornavn: fornavn,
          mellomnavn: mellomnavn,
          etternavn: etternavn,
          epost: epost,
          telefon: telefon,
          fodselsdato: fodselsdato,
          studie_id: studie,
          skole_id: skole,
          adresse: adresse,
          klassetrinn: klasse,
          alkoholdepositum: alkDep,
          rolle_id: rolle,
          rom_id: valgtRom,
          kjonn: kjonn,
        },
      });
    }
  };

  return (
    <div>
      {/* Confirmation dialog: */}
      <Dialog onClose={() => setLagBeboerDialog(false)} open={lagBeboerDialog}>
        <DialogTitle id="confirmation-dialog-title">
          Legg til{" "}
          <Typography color="primary" variant="inherit">
            {fornavn} {mellomnavn + " "}
            {etternavn}
          </Typography>{" "}
          som ny beboer?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Trykk på "Kjør" for å legge til ny beboer. Den nye bebeoren vil så
            dukke opp i beboerlista. Beboeren kan logge inn ved å bruke "Glemt
            passord"-funksjonen
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setLagBeboerDialog(false)}
            color="primary"
          >
            Avbryt
          </Button>
          <Button onClick={handleLagBeboer} color="primary">
            Kjør
          </Button>
        </DialogActions>
      </Dialog>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLagBeboerDialog(true);
        }}
        style={{ margin: "10px" }}
      >
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Fornavn"
              variant="outlined"
              value={fornavn}
              onChange={(e) => setFornavn(e.target.value)}
              required
              style={{ margin: 8 }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={mellomnavn}
              onChange={(e) => setMellomnavn(e.target.value)}
              label="Mellomnavn"
              variant="outlined"
              style={{ margin: 8 }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={etternavn}
              onChange={(e) => setEtternavn(e.target.value)}
              label="Etternavn"
              variant="outlined"
              required
              style={{ margin: 8 }}
            />
          </Grid>
          <Grid item container>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  container
                  className={classes.datepicker}
                  justify="flex-start"
                >
                  <KeyboardDatePicker
                    id="fodselsdag_input"
                    label="Fødselsdag"
                    format="dd/MM/yyyy"
                    value={fodselsdato}
                    onChange={handleDateChange}
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="kjønn-label">Kjønn</InputLabel>

                <Select
                  value={kjonn}
                  onChange={(e) => setKjonn(e.target.value)}
                  displayEmpty
                  labelId="kjønn-label"
                  label="Kjønn"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value={"default"}>
                    Velg kjønn
                  </MenuItem>
                  <MenuItem value={true}>Kvinne</MenuItem>
                  <MenuItem value={false}>Mann</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={8}>
              <TextField
                label="Adresse"
                variant="outlined"
                style={{ margin: 8 }}
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Postnummer"
                variant="outlined"
                style={{ margin: 8 }}
                value={postnummer}
                onChange={(e) => setPostnummer(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={7}>
              <TextField
                label="Epost"
                required
                variant="outlined"
                style={{ margin: 8 }}
                value={epost}
                helperText="Dette blir brukernavnet til internsiden"
                onChange={(e) => setEpost(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Telefon"
                variant="outlined"
                style={{ margin: 8 }}
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="skole-label">Skole</InputLabel>
              <Select
                value={skole}
                labelId="skole-label"
                onChange={(e) => setSkole(e.target.value)}
                displayEmpty
                label="Skole"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value={"default"}>
                  Velg skole
                </MenuItem>

                {skoler &&
                  skoler.length > 0 &&
                  skoler.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.navn}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="studie-label">Studie</InputLabel>

              <Select
                value={studie}
                onChange={(e) => setStudie(e.target.value)}
                displayEmpty
                labelId="studie-label"
                label="Studie"
              >
                <MenuItem disabled value={"default"}>
                  Velg studie
                </MenuItem>

                {studier &&
                  studier.length > 0 &&
                  studier.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.navn}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="klasse-label">Klasse</InputLabel>

              <Select
                value={klasse}
                onChange={(e) => setKlasse(e.target.value)}
                displayEmpty
                label="Klasse"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              style={{ margin: 8 }}
              control={
                <Checkbox
                  checked={alkDep}
                  onChange={() => setAlkDep(!alkDep)}
                  color="primary"
                />
              }
              label="Betalt alkoholdepositum"
            />
          </Grid>
          <Grid item>
            <FormControl
              required
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="rolle-label">Rolle</InputLabel>
              <Select
                value={rolle}
                onChange={(e) => setRolle(e.target.value)}
                displayEmpty
                labelId="rolle-label"
                label="Rolle "
              >
                <MenuItem disabled value={"default"}>
                  Velg rolle
                </MenuItem>

                {roller &&
                  roller.length > 0 &&
                  roller.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.navn}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl
              required
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel id="rom-label">Rom</InputLabel>
              <Select
                value={valgtRom}
                onChange={(e) => setValgtRom(e.target.value)}
                displayEmpty
                labelId="rom-label"
                label="Rom "
              >
                <MenuItem disabled value={"default"}>
                  Velg rom
                </MenuItem>

                {rom &&
                  rom.length > 0 &&
                  rom.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.navn}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justify="flex-end">
            <Button
              endIcon={<GroupAddIcon />}
              type="submit"
              variant="contained"
              color="primary"
            >
              Legg til som beboer
            </Button>
          </Grid>
        </Grid>
      </form>
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
    </div>
  );
};

export default NyBeboerInput;
