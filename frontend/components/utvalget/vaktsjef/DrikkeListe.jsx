import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Drikke query
import { GET_DRIKKER } from "../../../src/query/drikke";
import { getDrikker } from "../../../src/actions/drikke";

// Misc
import { useQuery } from "@apollo/react-hooks";

// Material UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

const DrikkeListe = (props) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [errorMelding, setErrorMelding] = useState("");

  useQuery(GET_DRIKKER, {
    onCompleted(data) {
      dispatch(getDrikker(data));
    },
  });

  const drikker = useSelector((state) => Object.values(state.drikke.drikke));

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Navn</TableCell>
              <TableCell>Pris</TableCell>
              <TableCell>Aktiv</TableCell>
              <TableCell>Farge</TableCell>
              <TableCell>Kommentar</TableCell>
              <TableCell>Produktnummer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drikker.map((drikke) => {
              return (
                <TableRow
                  onClick={() => props.toggleOppdaterDrikke(drikke.id)}
                  hover
                  style={{ cursor: "pointer" }}
                  key={drikke.id}
                >
                  <TableCell>
                    <Typography variant="subtitle1" color="textPrimary">
                      {drikke.navn}
                    </Typography>
                  </TableCell>
                  <TableCell>{drikke.pris}</TableCell>
                  <TableCell>{drikke.aktiv ? "Aktiv" : "Ikke aktiv"}</TableCell>
                  <TableCell>
                    <input type="color" disabled value={drikke.farge}></input>
                  </TableCell>
                  <TableCell>{drikke.kommentar}</TableCell>
                  <TableCell>{drikke.produktnr === null ? "Ikke spesifisert" : drikke.produktnr}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DrikkeListe;
