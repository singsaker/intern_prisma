import React from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import SchoolIcon from "@material-ui/icons/School";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

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
