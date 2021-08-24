import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HistoryIcon from "@material-ui/icons/History";

const Kontrollpanel = (props) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Antall valgte: {props.antallValgte}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="secondary"
              onClick={() => props.handleInkrementerValgte()}
              fullWidth
            >
              Inkrementer valgte
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => props.handleInkrementerAlle()}
            >
              Inkrementer alle
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              startIcon={<HistoryIcon />}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => props.handleResett()}
            >
              Resett
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
              onClick={() => props.handleLagre()}
              fullWidth
            >
              Lagre
            </Button>
            <Typography>
              <Box fontStyle="oblique" fontSize={13}>
                Endringer blir ikke lagret før du trykker på "Lagre" eller
                "Oppdater"
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Kontrollpanel;
