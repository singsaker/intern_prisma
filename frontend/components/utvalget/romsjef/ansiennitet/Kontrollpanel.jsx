import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HistoryIcon from "@mui/icons-material/History";

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
                Endringer blir ikke lagret før du trykker på &quot;Lagre&quot; eller &quot;Oppdater&quot;
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Kontrollpanel;
