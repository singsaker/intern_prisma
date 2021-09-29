import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// Apollo
import { useMutation, useQuery } from "@apollo/client";

// Redux
import { LOGIN_MUTATION, ER_INNLOGGET } from "../src/query/auth";
import { loggInn, loggUt } from "../src/actions/auth";
import { useDispatch } from "react-redux";

// Next
import { useRouter } from "next/router";
import Head from "next/head";

// Material-UI
import {
  Alert,
  Grid,
  Paper,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [cookies, setCookies] = useCookies();
  const dispatch = useDispatch();
  const router = useRouter();
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [autentiseringsfeil, setAutentiseringsfeil] = useState(false);
  const [innlogget, setInnlogget] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [validated, setValidated] = useState(false);
  const [showPswd, setShowPswd] = useState(false);

  // Sjekker om brukeren allerede er innlogget:
  useQuery(ER_INNLOGGET, {
    onCompleted(data) {
      if (data.sjekkToken) {
        dispatch(loggInn(data.sjekkToken));
        setInnlogget(true);
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  // Setter en cookie dersom login er suksessfull:
  const [handleLogin, { loading }] = useMutation(LOGIN_MUTATION, {
    variables: { epost, passord },
    onCompleted(data) {
      if (!data.login) {
        setAutentiseringsfeil(true);
        dispatch(loggUt());
      } else {
        let epx = new Date();
        epx.setSeconds(epx.getSeconds() + Number(data.login.tokenExpiration));

        setCookies("TokenCookie", data.login.token, {
          maxAge: data.login.tokenExpiration,
          domain: "localhost",
          sameSite: true,
          expires: epx,
        });
        dispatch(loggInn(data.login));
        setInnlogget(true);
      }
    },
    onError(error) {
      console.log(error);
      setAutentiseringsfeil(true);
    },
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    handleLogin();
  };

  useEffect(() => {
    if (innlogget && cookies.TokenCookie) {
      router.push("/");
    }
  }, [cookies, innlogget]);

  return (
    <div>
      <Head>
        <title>Login | Internsida</title>
      </Head>

      <Grid container justifyContent="center">
        <Paper variant="outlined" style={{ height: "300px", marginTop: "10%" }}>
          <Grid container justifyContent="center" style={{ margin: "3% 0" }}>
            <Typography variant="h4" color="primary">
              Singsaker Internside
            </Typography>
          </Grid>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Grid container justifyContent="center">
              <Grid item xs={10} style={{ margin: 8 }}>
                <FormControl required variant="outlined" style={{ width: "100%" }}>
                  <InputLabel htmlFor="component-outlined">Epost</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={epost}
                    onChange={(e) => setEpost(e.target.value)}
                    label="Epost"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={10} style={{ margin: 8 }}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel required htmlFor="passord">
                    Passord
                  </InputLabel>
                  <OutlinedInput
                    id="passord"
                    type={showPswd ? "text" : "password"}
                    value={passord}
                    onChange={(e) => setPassord(e.target.value)}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPswd(!showPswd)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          size="large"
                        >
                          {showPswd ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button onClick={() => router.push("/glemtpassord")} size="large" variant="contained" color="secondary">
                  Glemt passord
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" size="large" variant="contained" color="primary">
                  Logg inn
                  {loading && <CircularProgress size={24} />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar open={autentiseringsfeil} autoHideDuration={6000} onClose={() => setAutentiseringsfeil(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setAutentiseringsfeil(false)} severity="error">
          Autentiseringsfeil!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
