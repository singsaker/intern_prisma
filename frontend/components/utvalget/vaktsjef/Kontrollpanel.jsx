import React, { useState } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const Kontrollpanel = (props) => {
    return (
        <Card>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => props.toggleNyDrikke()}>
                    Ny Drikke
                </Button>

            </CardActions>
        </Card>
    )
}

export default Kontrollpanel;