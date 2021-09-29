import React from "react";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const Kontrollpanel = (props) => {
  return (
    <Card>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => props.toggleNyDrikke()}>
          Ny Drikke
        </Button>
      </CardActions>
    </Card>
  );
};

export default Kontrollpanel;
