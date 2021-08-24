import React, { useState } from "react";

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
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { flyttBeboer } from "../../../../src/actions/beboer";
import { FLYTT_BEBOER } from "../../../../src/query/beboer";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ProfilRomflytt = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <Grid container justify="center">
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
          <TextField
            disabled
            label="Nåværende rom"
            variant="outlined"
            value={beboerRom.navn}
            style={{ margin: 8 }}
          />
          <FormControl className={classes.formControl}>
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

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item>
            <KeyboardDatePicker
              margin="normal"
              label="Utflytt fra nåværende rom"
              format="dd/MM/yyyy"
              value={utflytt}
              onChange={handleUtflyttChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item>
            <KeyboardDatePicker
              margin="normal"
              label="Innflytt til nytt rom"
              format="dd/MM/yyyy"
              value={innflytt}
              onChange={handleInnflyttChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<ArrowForwardIcon />}
            type="submit"
          >
            Flytt
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
      <Snackbar
        open={feilmelding}
        autoHideDuration={6000}
        onClose={() => setFeilmelding(false)}
      >
        <Alert onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ProfilRomflytt;
