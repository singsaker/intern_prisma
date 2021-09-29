import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const Kontrollpanel = (props) => {
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
        <FormControl variant="outlined">
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
        <FormControl variant="outlined">
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
