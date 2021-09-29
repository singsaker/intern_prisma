import "date-fns";
import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSkole, getStudie, oppdaterBeboer } from "../../../src/actions/beboer";
import { UPDATE_BEBOER } from "../../../src/query/beboer";
import { GET_STUDIE, GET_SKOLE } from "../../../src/query/studie";

// Components
import { useMutation, useQuery } from "@apollo/react-hooks";

// Material-UI
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const ProfilRedigerInfo = (props) => {
  const dispatch = useDispatch();
  const studier = useSelector((state) => Object.values(state.skole.studier));
  const skoler = useSelector((state) => Object.values(state.skole.skoler));
  const beboer = useSelector((state) => state.beboer.beboere[props.beboer_id]);
  const date = new Date();
  const [epost, setEpost] = useState("");
  const [tlf, setTlf] = useState("");
  const [studie_id, setStudieId] = useState("default");
  const [skole_id, setSkoleId] = useState("default");
  const [adresse, setAdresse] = useState("");
  const [klassetrinn, setKlassetrinn] = useState("default");
  const [fodselsdato, setFodselsdag] = useState(new Date());
  const [vellykket, setVellykket] = useState(false);

  const studie = useQuery(GET_STUDIE, {
    onCompleted(data) {
      dispatch(getStudie(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  const skole = useQuery(GET_SKOLE, {
    onCompleted(data) {
      dispatch(getSkole(data));
    },
    onError(error) {
      console.log(error);
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
      setStudieId(beboer.studie.id);
      setSkoleId(beboer.skole.id);
      setAdresse(beboer.adresse);
      setKlassetrinn(beboer.klassetrinn);
      setFodselsdag(bday);
    }
  }, [beboer]);

  useEffect(() => {
    console.log(fodselsdato);
  }, [fodselsdato]);

  for (let i = date.getFullYear(); i >= 1950; i--) {
    aarListe.push(i);
  }

  for (let j = 1; j <= 31; j++) {
    dagListe.push(j);
  }

  const [submitBeboer, { loading }] = useMutation(UPDATE_BEBOER, {
    variables: {
      id: beboer.id,
      epost,
      telefon: tlf,
      studie_id: Number(studie_id),
      skole_id: Number(skole_id),
      fodselsdato,
      adresse,
      klassetrinn: Number(klassetrinn),
    },
    onCompleted(data) {
      dispatch(oppdaterBeboer(data));
      setVellykket(true);
    },
    onError(error) {
      setVellykket(false);
      console.log(error);
    },
  });

  const handleDateChange = (date) => {
    setFodselsdag(date);
  };

  if (studie.loading || skole.loading || loading)
    return (
      <Grid container justifyContent="center">
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
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
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
        <TextField
          id="adresse_input"
          label="Adresse"
          variant="outlined"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          style={{ margin: 8 }}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fødselsdag"
            id="fodselsdag_input"
            value={fodselsdato}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Grid>
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
        <Grid container direction="row" justifyContent="flex-end">
          <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} type="submit">
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

export default ProfilRedigerInfo;
