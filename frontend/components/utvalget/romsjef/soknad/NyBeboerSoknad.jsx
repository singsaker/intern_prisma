import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { isDate } from "lodash";
import formaterDato from "../../../../helpers/formaterDato";
import DOMPurify from "dompurify";

const NyBeboerSoknad = () => {
  const router = useRouter();
  const soknader = useSelector((state) => state.soknader);
  const params = router.query;

  if (soknader[params.sem] && soknader[params.sem][params.params[0]]) {
    const soknad = soknader[params.sem][params.params[0]];
    const innsendt = isDate(new Date(Number(soknad.innsendt)))
      ? new Date(Number(soknad.innsendt)).toISOString()
      : "Nei";
    return (
      <Card style={{ maxHeight: "100%", overflowY: "auto" }}>
        <CardContent>
          {/* Header: */}
          <Grid container justify="space-between">
            <Typography color="primary" variant="h5">
              {soknad.navn}
            </Typography>
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
            <Grid container direction="column" item xs={12}>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Innsendt
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {formaterDato(innsendt.split("T")[0])}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Epost
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.epost}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Født
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.fodselsar}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Studie
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.studie}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Skole
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.skole}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Fagbrev
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.fagbrev ? "Ja" : "Nei"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Kompetanse
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(soknad.kompetanse),
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
                    Kjenner
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body1">
                    {soknad.kjenner}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item justify="center" container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    color="textPrimary"
                    style={{ float: "right" }}
                    variant="body1"
                  >
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
            <Grid container item xs={12}>
              <Paper
                variant="elevation"
                elevation={8}
                style={{ maxHeight: "500px" }}
              >
                <Typography variant="body1" style={{ maxHeight: "inherit" }}>
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
      </Card>
    );
  }
};

export default NyBeboerSoknad;
