import React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NyListeInfo = (props) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Typography variant="h6" color="textPrimary">
          Gi et passende navn til storhybellisten
        </Typography>
        <Typography variant="body1" color="textSecondary">
          F.eks. &quot;Storhybelliste Vår 2019 - Nr. 1&quot;
        </Typography>
      </Grid>
      <Grid item xs={12} container direction="column" spacing={2}>
        <Grid item>
          <TextField
            required
            label="Tittel"
            value={props.tittel}
            onChange={props.handleTittelChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel id="semester-label">Age</InputLabel>
              <Select
                labelId="semester-label"
                id="semester"
                value={props.semester}
                onChange={(e) => props.handleSemesterChange(e)}
              >
                <MenuItem value="var">Vår</MenuItem>
                <MenuItem value="host">Høst</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField required label="År" value={props.aar} onChange={props.handleAarChange} variant="outlined" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NyListeInfo;
