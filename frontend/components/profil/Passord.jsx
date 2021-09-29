import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { ENDRE_PASSORD } from "../../src/query/auth";

// Components
import Spinner from "../CustomSpinner";

import { useMutation } from "@apollo/client";

// Material-UI
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Passord = () => {
  const bruker_id = useSelector((state) => state.auth.bruker_id);
  const [passord1, setPassord1] = useState("");
  const [passord2, setPassord2] = useState("");
  const [showPswd1, setShowPswd1] = useState(false);
  const [showPswd2, setShowPswd2] = useState(false);
  const [vellykket, setVellykket] = useState(false);
  const [error, setError] = useState(false);
  const [errorBeskjed, setErrorBeskjed] = useState("");

  const [endrePassord, { loading }] = useMutation(ENDRE_PASSORD, {
    variables: {
      id: bruker_id,
      nyttPassord: passord1,
    },
    onCompleted() {
      setError(false);
      setVellykket(true);
    },
    onError(error) {
      setErrorBeskjed(String(error));
      setVellykket(false);
      setError(true);
    },
  });

  const handleSubmit = () => {
    setError(false);
    setVellykket(false);
    if (passord1 === passord2) {
      if (passord1.length < 8) {
        setErrorBeskjed("Passordet må være lengre enn 8 tegn!");
        setError(true);
      } else {
        endrePassord();
      }
    } else {
      setErrorBeskjed("Passordene er ikke like!");
      setError(true);
    }
  };

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Alert hidden={!error} severity="error">
            {errorBeskjed}
          </Alert>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" style={{ margin: 8 }}>
            <InputLabel htmlFor="passord1">Passord</InputLabel>
            <OutlinedInput
              id="passord1"
              type={showPswd1 ? "text" : "password"}
              value={passord1}
              onChange={(e) => setPassord1(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPswd1(!showPswd1)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    size="large">
                    {showPswd1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" style={{ margin: 8 }}>
            <InputLabel htmlFor="passord2">Gjenta passord</InputLabel>
            <OutlinedInput
              id="passord2"
              type={showPswd2 ? "text" : "password"}
              value={passord2}
              onChange={(e) => setPassord2(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPswd2(!showPswd2)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    size="large">
                    {showPswd2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>

        <Grid container item justifyContent="flex-end">
          <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} type="submit">
            Lagre
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={vellykket} autoHideDuration={6000} onClose={() => setVellykket(false)}>
        <Alert onClose={() => setVellykket(false)} severity="success">
          Endringene ble lagret!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Passord;
