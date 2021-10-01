import React, { useState } from "react";

// Material-UI
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { flyttBeboer } from "../../../../src/actions/beboer";
import { FLYTT_BEBOER } from "../../../../src/query/beboer";

const ProfilRomflytt = (props) => {
  const dispatch = useDispatch();

  const beboerRom = useSelector((state) => {
    if (props.perm) {
      return state.beboer.permliste[props.beboer_id].rom;
    }
    return state.beboer.beboere[props.beboer_id].rom;
  });
  const rom = useSelector((state) => Object.values(state.rom.rom));
  const [nyttRom, setNyttRom] = useState("default");
  const [utflytt, setUtflytt] = useState(new Date());
  const [innflytt, setInnflytt] = useState(new Date());
  const [vellykket, setVellykket] = useState(false);
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");

  const [flyttBeboerMutation, { loading }] = useMutation(FLYTT_BEBOER, {
    onCompleted(data) {
      dispatch(flyttBeboer(data));
      setMelding("Beboer ble flyttet!");
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const handleSubmit = () => {
    if (nyttRom !== "default") {
      flyttBeboerMutation({
        variables: {
          id: props.beboer_id,
          romId: nyttRom,
          utflytt,
          innflytt,
        },
      });
    } else {
      setMelding("Nytt rom er ikke valgt!");
      setFeilmelding(true);
    }
  };

  const handleUtflyttChange = (date) => {
    setUtflytt(date);
  };

  const handleInnflyttChange = (date) => {
    setInnflytt(date);
  };

  if (loading)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid container direction="column" spacing={2}>
        <div>
          <TextField disabled label="Nåværende rom" variant="outlined" value={beboerRom.navn} style={{ margin: 8 }} />
          <FormControl>
            <InputLabel id="rom_label">Nytt rom</InputLabel>
            <Select
              labelId="rom_label"
              label="Nytt rom"
              id="rom_input"
              value={nyttRom}
              onChange={(e) => setNyttRom(e.target.value)}
              required
            >
              {rom.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.navn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Utflytt fra nåværende rom"
            value={utflytt}
            onChange={handleUtflyttChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Innflytt til nytt rom"
            value={innflytt}
            onChange={handleInnflyttChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Grid container justifyContent="flex-end">
          <Button variant="contained" color="primary" size="large" startIcon={<ArrowForwardIcon />} type="submit">
            Flytt
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={vellykket} autoHideDuration={6000} onClose={() => setVellykket(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setVellykket(false)} severity="success">
          {melding}
        </Alert>
      </Snackbar>
      <Snackbar open={feilmelding} autoHideDuration={6000} onClose={() => setFeilmelding(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ProfilRomflytt;
