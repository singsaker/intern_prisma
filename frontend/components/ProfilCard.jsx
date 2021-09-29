import React, { useEffect, useState } from "react";

// Apollo
import { useLazyQuery } from "@apollo/react-hooks";

// Helpers
import formaterTelefon from "../helpers/formaterTelefon";
import dateFormat from "dateformat";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBeboer } from "../src/actions/beboer";
import { GET_BEBOER } from "../src/query/beboer";

// Material-UI
import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, styled, Grid, CircularProgress, Typography, Snackbar, Alert } from "@mui/material";

const ProfileImgStyle = styled("img")(({ theme }) => ({
  borderRadius: "100%",
  height: 200,
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

const Profil = (props) => {
  const dispatch = useDispatch();
  const beboer = useSelector((state) => state.beboer.beboere[props.beboer_id]);
  const auth = useSelector((state) => state.auth);
  const [melding, setMelding] = useState("");
  const [vellykket, setVellykket] = useState(false);
  const [visAlert, setVisAlert] = useState(false);

  // eslint-disable-next-line no-unused-vars
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
      if (Number.isInteger(auth.bruker_id) && Number.isInteger(auth.beboer_id)) {
        hentBeboer({ variables: { id: props.beboer_id } });
      } else {
        setMelding("Du er ikke logget inn!");
        setVellykket(false);
        setVisAlert(true);
      }
    }
  }, [props.beboer_id]);

  if (!beboer)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  let vervTekst = "";

  if (beboer) {
    for (let i = 0; i < beboer?.verv.length; i++) {
      if (i === 0) {
        vervTekst += beboer.verv[i].navn;
      } else {
        vervTekst += ", " + beboer.verv[i].navn;
      }
    }

    return (
      <>
        <Box sx={{ p: 5, maxWidth: 1 }}>
          <Box sx={{ width: 1, display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon onClick={() => props.toggleBeboerModal()} style={{ cursor: "pointer" }} />
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <ProfileImgStyle src="https://source.unsplash.com/200x200/?mugshot" />
            <Typography variant="h4">
              {beboer.mellomnavn
                ? beboer.fornavn + " " + beboer.mellomnavn + " " + beboer.etternavn
                : beboer.fornavn + " " + beboer.etternavn}
            </Typography>
            <Typography gutterBottom color="secondary" variant="overline">
              {vervTekst}
            </Typography>
          </Box>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Chip label={formaterTelefon(beboer.telefon)}></Chip>
            </Grid>
            <Grid item>
              <Chip label={beboer.epost}></Chip>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography>
              Studerer {beboer.studie.navn} ved {beboer.skole.navn}. Går på {beboer.klassetrinn}. klassetrinn.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: 1, py: 3, bgcolor: "grey.900", textAlign: "center" }}>
          <Grid container spacing={3}>
            <Grid xs={4} item>
              <Typography variant="overline">Bor på rom</Typography>
              <Typography variant="h4">{beboer.rom && beboer.rom.navn}</Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="overline">Dager på huset</Typography>
              <Typography variant="h4">
                {Math.round((new Date().getTime() - new Date(beboer.innflyttet).getTime()) / (1000 * 60 * 60 * 24))}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="overline">Bursdag</Typography>
              <Typography variant="h4">{dateFormat(beboer.fodselsdato, "dd / mm")}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Snackbar open={visAlert} autoHideDuration={6000} onClose={() => setVisAlert(false)}>
          <Alert
            elevation={6}
            variant="filled"
            onClose={() => setVisAlert(false)}
            severity={vellykket ? "success" : "error"}
          >
            {melding}
          </Alert>
        </Snackbar>
      </>
    );
  }
};

export default Profil;
