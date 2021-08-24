import React, { useState, useEffect } from "react";

// Material-UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Components
import NyListeRom from "./NyListeRom";
import NyListeInfo from "./NyListeInfo";
import NyListeBeboer from "./NyListeBeboer";
import NyListeSammendrag from "./NyListeSammendrag";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const NyListeModal = (props) => {
  const classes = useStyles();
  const [aktivStep, setAktivStep] = useState(0);
  const rom = useSelector((state) => Object.values(state.rom.rom));
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));

  const [bekreftListeModal, setBekreftListeModal] = useState(false);

  // State for "Info"
  const [tittel, setTittel] = useState("");
  const [aar, setAar] = useState(new Date().getFullYear());
  const [semester, setSemester] = useState("var");

  // State for "Legg til rom"
  const [valgt, setValgt] = useState([]);
  const [venstre, setVenstre] = useState([]);
  const [hoyre, setHoyre] = useState([]);

  // State for "Legg til beboere"
  const [valgtBeboere, setValgtBeboere] = useState([]);
  const [venstreBeboere, setVenstreBeboere] = useState([]);
  const [hoyreBeboere, setHoyreBeboere] = useState([]);

  const handleNesteSteg = () => {
    if (aktivStep < 3) {
      setAktivStep(aktivStep + 1);
    }
  };

  const handleTilbake = () => {
    if (aktivStep > 0) {
      setAktivStep(aktivStep - 1);
    }
  };

  // Setter status som checked/ikke checked på rom
  const handleVelgRom = (id) => {
    const index = _.indexOf(valgt, id);

    if (index === -1) {
      setValgt([...valgt, id]);
    } else {
      setValgt(valgt.filter((i) => i !== id));
    }
  };

  const handleFlyttRomHoyre = () => {
    let nyVenstre = [...venstre];
    let nyHoyre = [...hoyre];
    for (let i = 0; i < valgt.length; i++) {
      const index = _.findIndex(nyVenstre, (r) => {
        return r.id === valgt[i];
      });

      if (index !== -1) {
        nyHoyre = [...nyHoyre, ...nyVenstre.splice(index, 1)];
      }
    }
    setVenstre(nyVenstre);
    setHoyre(nyHoyre);
    setValgt([]);
  };

  const handleFlyttRomVenstre = () => {
    let nyVenstre = [...venstre];
    let nyHoyre = [...hoyre];
    for (let i = 0; i < valgt.length; i++) {
      const index = _.findIndex(nyHoyre, (r) => {
        return r.id === valgt[i];
      });

      if (index !== -1) {
        nyVenstre = [...nyVenstre, ...nyHoyre.splice(index, 1)];
      }
    }
    setVenstre(nyVenstre);
    setHoyre(nyHoyre);
    setValgt([]);
  };

  const handleTittelChange = (event) => {
    setTittel(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleAarChange = (event) => {
    setAar(event.target.value);
  };

  const handleVelgBeboer = (id) => {
    const index = _.indexOf(valgtBeboere, id);

    if (index === -1) {
      setValgtBeboere([...valgtBeboere, id]);
    } else {
      setValgtBeboere(valgtBeboere.filter((i) => i !== id));
    }
  };

  const handleFlyttBeboerHoyre = () => {
    let nyVenstre = [...venstreBeboere];
    let nyHoyre = [...hoyreBeboere];
    for (let i = 0; i < valgtBeboere.length; i++) {
      const index = _.findIndex(nyVenstre, (r) => {
        return r.id === valgtBeboere[i];
      });

      if (index !== -1) {
        nyHoyre = [...nyHoyre, ...nyVenstre.splice(index, 1)];
      }
    }
    setVenstreBeboere(nyVenstre);
    setHoyreBeboere(nyHoyre);
    setValgtBeboere([]);
  };

  const handleFlyttBeboerVenstre = () => {
    let nyVenstre = [...venstreBeboere];
    let nyHoyre = [...hoyreBeboere];
    for (let i = 0; i < valgtBeboere.length; i++) {
      const index = _.findIndex(nyHoyre, (r) => {
        return r.id === valgtBeboere[i];
      });

      if (index !== -1) {
        nyVenstre = [...nyVenstre, ...nyHoyre.splice(index, 1)];
      }
    }
    setVenstreBeboere(nyVenstre);
    setHoyreBeboere(nyHoyre);
    setValgtBeboere([]);
  };

  const toggleBekreftListeModal = () => {
    setBekreftListeModal(!bekreftListeModal);
  };

  const handleLagStorhybelliste = () => {
    setBekreftListeModal(false);
    props.handleLagStorhybelliste({
      navn: tittel,
      aar: aar,
      semester: semester,
      beboere: hoyreBeboere.map((beb) => beb.id),
      rom: hoyre.map((r) => r.id),
    });
  };

  // Fyller opp
  useEffect(() => {
    if (venstre.length === 0) {
      setVenstre(rom);
    }
    if (venstreBeboere.length === 0) {
      setVenstreBeboere(beboere);
    }
  }, []);

  return (
    <Card>
      {/* Listemodal */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={bekreftListeModal}
        onClose={toggleBekreftListeModal}
      >
        <DialogTitle>{`Lag storhybellisten ${tittel}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ved å trykke bekreft blir det lagd en storhybelliste hvor det er
            lagt til {hoyre.length} rom og {hoyreBeboere.length} beboere. Det
            blir mulig å legge til flere rom og beboere senere også (under
            utvikling). Listen vil som standard ikke være satt som aktiv. Dette
            gjøres ved å gå inn på listen etter den er lagd.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleBekreftListeModal} color="secondary">
            Avbryt
          </Button>
          <Button onClick={handleLagStorhybelliste} color="primary" autoFocus>
            Bekreft
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Grid container justify="space-between">
          <Grid item></Grid>
          <Grid item>
            <CloseIcon
              onClick={() => props.toggleNyListe()}
              style={{ cursor: "pointer", margin: "8px" }}
            />
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Stepper activeStep={aktivStep}>
            <Step>
              <StepLabel>Info</StepLabel>
            </Step>
            <Step>
              <StepLabel>Legg til rom</StepLabel>
            </Step>
            <Step>
              <StepLabel>Legg til beboere</StepLabel>
            </Step>
            <Step>
              <StepLabel>Sammendrag</StepLabel>
            </Step>
          </Stepper>
        </div>
        {aktivStep === 0 && (
          <Grid container>
            <NyListeInfo
              tittel={tittel}
              aar={aar}
              semester={semester}
              handleTittelChange={handleTittelChange}
              handleAarChange={handleAarChange}
              handleSemesterChange={handleSemesterChange}
            />
          </Grid>
        )}
        {aktivStep === 1 && (
          <Grid container>
            <NyListeRom
              venstre={venstre}
              hoyre={hoyre}
              valgt={valgt}
              handleVelg={handleVelgRom}
              handleFlyttRomHoyre={handleFlyttRomHoyre}
              handleFlyttRomVenstre={handleFlyttRomVenstre}
            />
          </Grid>
        )}
        {aktivStep === 2 && (
          <Grid container>
            <NyListeBeboer
              venstre={venstreBeboere}
              hoyre={hoyreBeboere}
              valgt={valgtBeboere}
              handleVelg={handleVelgBeboer}
              handleFlyttBeboerHoyre={handleFlyttBeboerHoyre}
              handleFlyttBeboerVenstre={handleFlyttBeboerVenstre}
            />
          </Grid>
        )}
        {aktivStep === 3 && (
          <Grid contained>
            <NyListeSammendrag
              valgtBeboere={hoyreBeboere}
              valgtRom={hoyre}
              tittel={tittel}
            />
          </Grid>
        )}

        <Grid container spacing={2} justify="flex-end">
          <Grid item>
            <Button onClick={() => handleTilbake()} disabled={aktivStep === 0}>
              Tilbake
            </Button>
          </Grid>
          <Grid item>
            {aktivStep === 3 ? (
              <Button
                onClick={() => toggleBekreftListeModal()}
                variant="contained"
                color="primary"
              >
                Lag liste
              </Button>
            ) : (
              <Button
                onClick={() => handleNesteSteg()}
                variant="contained"
                color="primary"
              >
                Neste
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NyListeModal;
