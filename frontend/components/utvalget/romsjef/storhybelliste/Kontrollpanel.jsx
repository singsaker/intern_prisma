import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";

const Kontrollpanel = (props) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => props.toggleNyListe()}
              fullWidth
            >
              Ny liste
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Kontrollpanel;
