import React, { useState } from "react";

import _ from "lodash";

// Material-UI
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { LAG_STORHYBELLISTE } from "../../../../src/query/storhybelliste";
import { lagStorhybelliste } from "../../../../src/actions/storhybelliste";

const NyListeModal = (props) => {
  const dispatch = useDispatch();
  const [bekreftListeModal, setBekreftListeModal] = useState(false);
  const [navn, setNavn] = useState("");
  const [paameldingStart, setPaameldingStart] = useState(new Date());
  const [paamelding, setPaamelding] = useState(true);
  const [velgingStart, setVelgingStart] = useState(new Date());
  const [velging, setVelging] = useState(true);
  const [vellykket, setVellykket] = useState(true);
  const [visMelding, setVisMelding] = useState(false);
  const [melding, setMelding] = useState("");

  const handleNavnChange = (event) => {
    setNavn(event.target.value);
  };

  const toggleBekreftListeModal = () => {
    setBekreftListeModal(!bekreftListeModal);
  };

  const handleLagStorhybelliste = () => {
    setBekreftListeModal(false);
    props.handleLagStorhybelliste({
      navn: navn,
    });
  };

  const [lagStorhybellisteMutation] = useMutation(LAG_STORHYBELLISTE, {
    variables: {
      navn: navn,
      paameldingStart: paamelding ? paameldingStart : null,
      velgingStart: velging ? velgingStart : null,
    },
    onCompleted(data) {
      setVellykket(true);
      setMelding("Ny storhybelliste ble opprettet!");
      setVisMelding(true);
      dispatch(lagStorhybelliste(data));
      props.toggleNyListe();
    },
    onError(error) {
      setVellykket(false);
      setMelding(error.message);
      setVisMelding(true);
    },
  });

  return (
    <Card>
      {/* Listemodal */}
      <Dialog maxWidth="sm" fullWidth open={bekreftListeModal} onClose={toggleBekreftListeModal}>
        <DialogTitle>{`Lag storhybellisten ${navn}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ved å trykke bekreft blir det lagd en storhybelliste hvor det er lagt til rom og beboere. Det blir mulig å
            legge til flere rom og beboere senere også (under utvikling). Listen vil som standard ikke være satt som
            aktiv. Dette gjøres ved å gå inn på listen etter den er lagd.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleBekreftListeModal} color="secondary">
            Avbryt
          </Button>
          <Button onClick={handleLagStorhybelliste} color="primary">
            Bekreft
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            lagStorhybellisteMutation();
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item></Grid>
            <Grid item>
              <CloseIcon onClick={() => props.toggleNyListe()} style={{ cursor: "pointer", margin: "8px" }} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Navn på storhybelliste"
                variant="outlined"
                value={navn}
                onChange={(e) => handleNavnChange(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Påmelding starter"
                  value={paameldingStart}
                  minDateTime={new Date()}
                  onChange={(newValue) => {
                    setPaameldingStart(newValue);
                  }}
                  disabled={!paamelding}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={paamelding} onChange={() => setPaamelding(!paamelding)} />}
                  label="Start påmelding automatisk"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Velging starter"
                  value={velgingStart}
                  minDateTime={paameldingStart}
                  onChange={(newValue) => {
                    setVelgingStart(newValue);
                  }}
                  disabled={!velging}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={velging} onChange={() => setVelging(!velging)} />}
                  label="Start velging automatisk"
                />
              </FormGroup>
            </Grid>
            <Grid container direction="row" justifyContent="flex-end">
              <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />} type="submit">
                Lag
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Snackbar open={visMelding} autoHideDuration={6000} onClose={() => setVisMelding(false)}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setVisMelding(false)}
          severity={vellykket ? "success" : "error"}
        >
          {melding}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default NyListeModal;
