import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Kontrollpanel = (props) => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  const lagAarValg = () => {
    let aktuelleAar = [];
    for (let i = 2008; i <= currentYear; i++) {
      aktuelleAar.push(i);
    }
    return aktuelleAar;
  };

  return (
    <Card>
      <CardContent>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="aar-label">År</InputLabel>
          <Select
            labelId="aar-label"
            value={props.aar}
            onChange={(e) => props.handleAarChange(e.target.value)}
            label="År"
          >
            {lagAarValg()
              .sort((a, b) => {
                return b - a;
              })
              .map((aar) => {
                return (
                  <MenuItem value={aar} key={aar}>
                    {aar}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="semester-label">Semester</InputLabel>
          <Select
            labelId="semester-label"
            value={props.semester}
            onChange={(e) => props.handleSemesterChange(e.target.value)}
            label="Semester"
          >
            <MenuItem value="host">Høst</MenuItem>
            <MenuItem value="vaar">Vår</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Kontrollpanel;
