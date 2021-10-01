import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";

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
