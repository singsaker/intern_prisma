import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

// Lag drikke query
import { LAG_DRIKKE } from "../../../src/query/drikke";
import { lagDrikke } from "../../../src/actions/drikke";

// Material UI
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControllLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

// Matrial UI icons
import CloseIcon from "@mui/icons-material/Close";

const NyDrikkeModal = (props) => {
  const dispatch = useDispatch();
  const [navn, setNavn] = useState("");
  const [pris, setPris] = useState("");
  const [aktiv, setAktiv] = useState(false);
  const [farge, setFarge] = useState("#111111");
  const [kommentar, setKommentar] = useState("");
  const [produktnr, setProduktnr] = useState("");

  const [lagNyDrikkeFunc] = useMutation(LAG_DRIKKE, {
    onCompleted(data) {
      dispatch(lagDrikke(data));
      props.setMelding("Ny drikke lagt til!");
      props.setVellykket(true);
      props.toggleNyDrikke();
    },
    variables: {
      navn: navn,
      pris: Number(pris),
      aktiv: aktiv,
      farge: farge,
      kommentar: kommentar,
      produktnr: produktnr === "" ? null : Number(produktnr),
      vin: false,
    },
    onError(error) {
      props.setMelding(error.message);
      props.setFeilmelding(true);
    },
  });

  return (
    <form
      style={{ margin: "10px" }}
      onSubmit={(e) => {
        e.preventDefault();
        lagNyDrikkeFunc();
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <Typography color="primary" variant="h6">
              Legg til drikke
            </Typography>
          </Grid>
          <Grid item>
            <CloseIcon onClick={() => props.toggleNyDrikke()} style={{ cursor: "pointer", margin: "8px" }} />
          </Grid>
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Navn"
            value={navn}
            onChange={(event) => setNavn(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Pris"
            value={pris}
            onChange={(event) => setPris(event.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Kommentar"
            value={kommentar}
            onChange={(event) => setKommentar(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Produktnummer"
            value={produktnr}
            onChange={(event) => setProduktnr(event.target.value)}
          />
        </Grid>
        <Grid item container justifyContent="center">
          <FormControllLabel
            label="Aktiv?"
            control={
              <Checkbox variant="outlined" checked={aktiv} onChange={(event) => setAktiv(event.target.checked)} />
            }
          />
        </Grid>
        <Grid item container justifyContent="center">
          <label htmlFor="drikkeFarge">Velg farge:</label>
          <input
            style={{ marginLeft: "10px" }}
            type="color"
            id="drikkeFarge"
            value={farge}
            onChange={(event) => setFarge(event.target.value)}
          />
        </Grid>
        <Grid item container justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Legg til drikke
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NyDrikkeModal;
