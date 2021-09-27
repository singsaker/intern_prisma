import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { ENDRE_PASSORD } from "../../src/query/auth";

// Components
import Spinner from "../CustomSpinner";

import { useMutation } from "@apollo/react-hooks";

// Material-UI
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
                  >
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
                  >
                    {showPswd2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>

        <Grid container item justify="flex-end">
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
