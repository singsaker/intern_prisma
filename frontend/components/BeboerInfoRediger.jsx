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
import SaveIcon from "@material-ui/icons/Save";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import {
  Alert,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";

const BeboerInfoRediger = (props) => {
  const dispatch = useDispatch();
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
  // eslint-disable-next-line no-unused-vars
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
      props.gammelBeboer ? dispatch(oppdaterGammelBeboer(data)) : dispatch(oppdaterBeboer(data));

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
    <>
      {vellykket && (
        <Alert elevation={6} variant="filled" onClose={() => setVellykket(false)} severity="success">
          {melding}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitBeboer();
        }}
      >
        <Stack spacing={2}>
          <TextField
            required
            id="fornavn_input"
            label="Fornavn"
            variant="outlined"
            value={fornavn}
            onChange={(e) => setFornavn(e.target.value)}
            fullWidth
          />
          <TextField
            id="mellomnavn_input"
            label="Mellomnavn"
            variant="outlined"
            value={mellomnavn}
            onChange={(e) => setMellomnavn(e.target.value)}
            fullWidth
          />
          <TextField
            required
            id="etternavn_input"
            label="Etternavn"
            variant="outlined"
            value={etternavn}
            onChange={(e) => setEtternavn(e.target.value)}
            fullWidth
          />
          <TextField
            required
            id="epost_input"
            label="Epost"
            variant="outlined"
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
            fullWidth
          />
          <TextField
            id="telefon_input"
            label="Telefon"
            variant="outlined"
            value={tlf}
            onChange={(e) => setTlf(e.target.value)}
            fullWidth
          />
          <div>
            <Grid xs={12} container spacing={2}>
              <Grid md={6} xs={12} item>
                <TextField
                  id="adresse_input"
                  label="Adresse"
                  variant="outlined"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid md={6} xs={12} item>
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
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fødselsdag"
              id="fodselsdag_input"
              value={fodselsdato}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Grid container xs={12}>
            <FormControl>
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
            <FormControl>
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
            <FormControl>
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
            <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} type="submit">
              Lagre
            </Button>
          </Grid>
        </Stack>
      </form>
    </>
  );
};

export default BeboerInfoRediger;
