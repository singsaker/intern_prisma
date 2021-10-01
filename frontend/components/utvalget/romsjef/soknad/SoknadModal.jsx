import React from "react";

// Material-UI
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import DOMPurify from "dompurify";
import formaterDato from "../../../../helpers/formaterDato";

import { useSelector } from "react-redux";
import { isDate } from "lodash";
import { useRouter } from "next/router";

const SoknadModal = (props) => {
  const router = useRouter();
  const soknader = useSelector((state) => state.soknader);

  if (soknader[props.semester] && soknader[props.semester][props.id]) {
    const soknad = soknader[props.semester][props.id];
    const innsendt = isDate(new Date(Number(soknad.innsendt)))
      ? new Date(Number(soknad.innsendt)).toISOString()
      : "Nei";
    return (
      <Card style={{ maxHeight: "100%", overflowY: "auto" }}>
        <CardContent>
          {/* Header: */}
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography color="primary" variant="h5">
                {soknad.navn}
              </Typography>
            </Grid>
            <Grid item>
              <CloseIcon onClick={() => props.toggleSoknadModal()} style={{ cursor: "pointer", margin: "8px" }} />
            </Grid>
          </Grid>
          {/* Body */}

          <Grid
            container
            spacing={2}
            style={{
              maxHeight: "100%",
            }}
          >
            {/* Info */}
            <Grid container direction="column" item xs={12} md={6}>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Innsendt
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {formaterDato(innsendt.split("T")[0])}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Epost
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.epost}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Født
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.fodselsar}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Studie
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.studie}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Skole
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.skole}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Fagbrev
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.fagbrev ? "Ja" : "Nei"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Kompetanse
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1" component="div">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(soknad.kompetanse),
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Kjenner
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.kjenner}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="textPrimary" style={{ float: "right" }} variant="body1">
                    Kjennskap
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.kjennskap}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* Søknad */}
            <Grid container item xs={12} md={6}>
              <Paper variant="elevation" elevation={8} style={{ maxHeight: "500px" }}>
                <Typography variant="body1" component="div" style={{ maxHeight: "inherit" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(soknad.tekst),
                    }}
                    style={{
                      margin: "20px",
                      padding: "20px",
                      overflowY: "auto",
                      maxHeight: "460px",
                    }}
                  />
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              color="primary"
              onClick={() => router.push(`/utvalget/romsjef/soknader/${props.id}/?sem=${props.semester}`)}
            >
              Videre til innflytting
            </Button>
          </Grid>
        </CardActions>
      </Card>
    );
  }
  return <div>Ingen søknad</div>;
};

export default SoknadModal;
