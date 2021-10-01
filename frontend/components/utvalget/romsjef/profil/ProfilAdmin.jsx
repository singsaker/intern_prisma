import React, { useState, useEffect } from "react";

// Material-UI
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FlightIcon from "@mui/icons-material/Flight";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLLER } from "../../../../src/query/regi";
import { getRoller } from "../../../../src/actions/regi";
import { GET_ALLE_ROM } from "../../../../src/query/rom";
import { getAlleRom } from "../../../../src/actions/rom";
import { UPDATE_BEBOER_ADMIN, SLETT_BEBOER, UPDATE_BEBOER_PERM } from "../../../../src/query/beboer";
import { oppdaterBeboerAdmin, slettBeboer, sendPaaPerm, sendHjemFraPerm } from "../../../../src/actions/beboer";

const ProfilAdmin = (props) => {
  const [depositum, setDepositum] = useState(false);
  const [rolle, setRolle] = useState("default");
  const [rom, setRom] = useState("default");
  const [kundenr, setKundenr] = useState("");
  const beboer = useSelector((state) => {
    if (props.perm) {
      return state.beboer.permliste[props.beboer_id];
    }
    return state.beboer.beboere[props.beboer_id];
  });
  const roller = useSelector((state) => Object.values(state.regi.roller));
  const alleRom = useSelector((state) => Object.values(state.rom.rom));
  const [vellykket, setVellykket] = useState(false);
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");
  const [slettFornavn, setSlettFornavn] = useState("");
  const [slettBeboerToggle, setSlettBeboerToggle] = useState(false);
  const [perm, setPerm] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (beboer) {
      setDepositum(beboer.alkoholdepositum);
      setRolle(beboer.rolle.id);
      setRom(beboer.rom.id);
      setKundenr(beboer.kundenr ? beboer.kundenr : "");
      setPerm(beboer.perm);
    }
  }, [beboer]);

  const rollerQuery = useQuery(GET_ROLLER, {
    onCompleted(data) {
      dispatch(getRoller(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const romQuery = useQuery(GET_ALLE_ROM, {
    onCompleted(data) {
      dispatch(getAlleRom(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const [oppdaterBeboerMutation] = useMutation(UPDATE_BEBOER_ADMIN, {
    onCompleted(data) {
      dispatch(oppdaterBeboerAdmin(data));
      setMelding("Beboer ble oppdatert!");
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
    variables: {
      id: props.beboer_id,
      depositum: Boolean(depositum),
      rolleId: Number(rolle),
      romId: Number(rom),
      kundenr: Number(kundenr),
    },
  });

  const [slettBeboerMutation] = useMutation(SLETT_BEBOER, {
    onCompleted(data) {
      setMelding("Beboer ble slettet!");
      setVellykket(true);
      dispatch(slettBeboer(data));
      props.lukkModal();
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
    variables: {
      id: beboer.id,
    },
  });

  const [oppdaterPermStatusMutation] = useMutation(UPDATE_BEBOER_PERM, {
    onCompleted(data) {
      if (beboer.perm === 0) {
        dispatch(sendPaaPerm(data));
        setMelding("Beboer ble sendt på perm!");
      } else {
        dispatch(sendHjemFraPerm(data));
        setMelding("Beboer kom hjem fra perm!");
      }
      setVellykket(true);
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
    variables: {
      id: beboer.id,
      perm: perm === 0 ? 1 : 0,
    },
  });

  const handleSlettBeboer = () => {
    slettBeboerMutation();
  };

  if (
    oppdaterBeboerMutation.loading ||
    romQuery.loading ||
    slettBeboerMutation.loading ||
    rollerQuery.loading ||
    oppdaterPermStatusMutation.loading
  )
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <div>
      <Grid container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            oppdaterBeboerMutation();
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                  id="kundenr"
                  label="Kundenummer"
                  variant="outlined"
                  value={kundenr}
                  onChange={(e) => setKundenr(e.target.value)}
                />
              </FormControl>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={depositum} onChange={(e) => setDepositum(e.target.checked)} name="depositum" />
                    }
                    label="Betalt depositum"
                  />
                </FormGroup>
              </FormControl>

              {!rollerQuery.loading && roller.length > 0 && (
                <FormControl>
                  <InputLabel id="rolle_label">Rolle</InputLabel>
                  <Select
                    labelId="rolle_label"
                    id="rolle_input"
                    label="Rolle"
                    value={rolle}
                    onChange={(e) => setRolle(e.target.value)}
                  >
                    {roller.map((rolle) => (
                      <MenuItem key={rolle.id} value={rolle.id}>
                        {rolle.navn}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {!romQuery.loading && alleRom.length > 0 && (
                <FormControl>
                  <InputLabel id="rom_label">Rom</InputLabel>
                  <Select
                    labelId="rom_label"
                    label="Rom"
                    id="rom_input"
                    value={rom}
                    onChange={(e) => setRom(e.target.value)}
                  >
                    {alleRom.map((rom) => (
                      <MenuItem key={rom.id} value={rom.id}>
                        {rom.navn}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>

            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="text"
                  size="large"
                  color="secondary"
                  onClick={() => setSlettBeboerToggle(!slettBeboerToggle)}
                  startIcon={<DeleteIcon />}
                >
                  Slett beboer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  startIcon={<FlightIcon />}
                  onClick={() => oppdaterPermStatusMutation()}
                >
                  {perm === 0 ? "Send på perm" : "Send hjem fra perm"}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} type="submit">
                  Lagre
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>

        {slettBeboerToggle && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSlettBeboer();
            }}
          >
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1">Er du sikker på at du vil slette denne beboeren?</Typography>
              </Grid>
              <Grid item container>
                <Grid item>
                  <TextField
                    variant="outlined"
                    value={slettFornavn}
                    label="Fornavn"
                    onChange={(e) => setSlettFornavn(e.target.value)}
                    helperText="Skriv inn fornavnet til beboeren (case sensitiv)"
                  />
                </Grid>
                {slettFornavn === beboer.fornavn && (
                  <Grid item>
                    <Button size="large" type="submit" startIcon={<DeleteIcon />}>
                      Slett
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </form>
        )}
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
    </div>
  );
};

export default ProfilAdmin;
