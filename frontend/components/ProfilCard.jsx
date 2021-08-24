import React, { useEffect, useState } from "react";

// Apollo
import { useLazyQuery } from "@apollo/react-hooks";

// Helpers
import formaterTelefon from "../helpers/formaterTelefon";
import formaterDato from "../helpers/formaterDato";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBeboer } from "../src/actions/beboer";
import { GET_BEBOER } from "../src/query/beboer";

// Material-UI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Profil = (props) => {
  const dispatch = useDispatch();
  const beboer = useSelector((state) => state.beboer.beboere[props.beboer_id]);
  const auth = useSelector((state) => state.auth);
  const [melding, setMelding] = useState("");
  const [vellykket, setVellykket] = useState(false);
  const [visAlert, setVisAlert] = useState(false);

  const [hentBeboer, { loading }] = useLazyQuery(GET_BEBOER, {
    onCompleted(data) {
      dispatch(getBeboer(data));
    },
    onError(error) {
      setMelding(error.message);
      setVellykket(false);
      setVisAlert(true);
    },
  });

  useEffect(() => {
    if (Number.isInteger(props.beboer_id) && !beboer) {
      if (
        Number.isInteger(auth.bruker_id) &&
        Number.isInteger(auth.beboer_id)
      ) {
        hentBeboer({ variables: { id: props.beboer_id } });
      } else {
        setMelding("Du er ikke logget inn!");
        setVellykket(false);
        setVisAlert(true);
      }
    }
  }, [props.beboer_id]);

  if (loading)
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );

  let vervTekst = "";
  for (let i = 0; i < beboer.verv.length; i++) {
    if (i === 0) {
      vervTekst += beboer.verv[i].navn;
    } else {
      vervTekst += ", " + beboer.verv[i].navn;
    }
  }

  return (
    <Card style={{ maxWidth: "200" }} variant="outlined">
      <CardContent>
        <Grid container justify="space-between">
          <Grid item></Grid>
          <Grid item>
            <CloseIcon
              onClick={() => props.toggleBeboerModal()}
              style={{ cursor: "pointer", margin: "8px" }}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <img
            src="https://source.unsplash.com/200x200/?mugshot"
            style={{
              height: "200px",
            }}
          />
        </Grid>
        <Grid container>
          <Grid container direction="row" justify="center">
            <Typography color="primary" variant="h4">
              {beboer.mellomnavn
                ? beboer.fornavn +
                  " " +
                  beboer.mellomnavn +
                  " " +
                  beboer.etternavn
                : beboer.fornavn + " " + beboer.etternavn}
            </Typography>
          </Grid>
          <Grid container justify="center">
            <Typography gutterBottom color="secondary" variant="overline">
              {vervTekst}
            </Typography>
          </Grid>
          <Grid container direction="column">
            <Grid item container justify="center" xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography
                  color="textPrimary"
                  style={{ float: "right" }}
                  variant="h6"
                >
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" variant="h6">
                  {beboer.epost}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justify="center" xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography
                  color="textPrimary"
                  style={{ float: "right" }}
                  variant="h6"
                >
                  Telefon
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" variant="h6">
                  {formaterTelefon(beboer.telefon)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justify="center" xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography
                  color="textPrimary"
                  style={{ float: "right" }}
                  variant="h6"
                >
                  Fødselsdag
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" variant="h6">
                  {formaterDato(beboer.fodselsdato)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justify="center" xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography
                  color="textPrimary"
                  style={{ float: "right" }}
                  variant="h6"
                >
                  Rolle
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" variant="h6">
                  {beboer.rolle.navn}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justify="center" xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography
                  color="textPrimary"
                  style={{ float: "right" }}
                  variant="h6"
                >
                  Studie
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" variant="h6">
                  {beboer.studie.navn}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justify="center" xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography
                  color="textPrimary"
                  style={{ float: "right" }}
                  variant="h6"
                >
                  Skole
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" variant="h6">
                  {beboer.skole.navn}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={12} spacing={2}>
            <Grid item xs={4}>
              <Typography
                color="textPrimary"
                style={{ float: "right" }}
                variant="h6"
              >
                Klassetrinn
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography color="textSecondary" variant="h6">
                {beboer.klassetrinn}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={12} spacing={2}>
            <Grid item xs={4}>
              <Typography
                color="textPrimary"
                style={{ float: "right" }}
                variant="h6"
              >
                Rom
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography color="textSecondary" variant="h6">
                {beboer.rom && beboer.rom.navn}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={12} spacing={2}>
            <Grid item xs={4}>
              <Typography
                color="textPrimary"
                style={{ float: "right" }}
                variant="h6"
              >
                Innflyttet
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography color="textSecondary" variant="h6">
                {formaterDato(beboer.innflyttet)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Snackbar
        open={visAlert}
        autoHideDuration={6000}
        onClose={() => setVisAlert(false)}
      >
        <Alert
          onClose={() => setVisAlert(false)}
          severity={vellykket ? "success" : "error"}
        >
          {melding}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Profil;
