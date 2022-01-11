import React, { useState } from "react";

import _ from "lodash";

// Material-UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const NyListeModal = (props) => {
  const [bekreftListeModal, setBekreftListeModal] = useState(false);
  const [navn, setNavn] = useState("");
  const [paamelding, setPaamelding] = useState(new Date());
  const [velging, setVelging] = useState(new Date());

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
              label="Navn"
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
                value={paamelding}
                minDateTime={new Date()}
                onChange={(newValue) => {
                  setPaamelding(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Velging starter"
                value={velging}
                minDateTime={paamelding}
                onChange={(newValue) => {
                  setVelging(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NyListeModal;
