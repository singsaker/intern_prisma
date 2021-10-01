import React from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Kontrollpanel = (props) => {
  return (
    <Card variant="outlined">
      <CardActions>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Button
              size="large"
              onClick={() => props.toggleStudieAdmin()}
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<SchoolIcon />}
            >
              Administrer studier
            </Button>
          </Grid>
          <Grid item md={6} xs={12}>
            <Button
              size="large"
              onClick={() => props.toggleNyBeboer()}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<PersonAddIcon />}
            >
              Ny beboer
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Kontrollpanel;
