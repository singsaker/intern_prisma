import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getPermliste } from "../../../src/actions/beboer";
import { GET_PERMLISTE } from "../../../src/query/beboer";

// Misc
import _ from "lodash";
import { useQuery } from "@apollo/client";

// Material UI
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Alert,
  Snackbar,
  TableHead,
  Avatar,
  Chip,
} from "@mui/material";

const BeboerListeAnsiennitet = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.permliste));
  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);
  const [melding, setMelding] = useState("");
  const [feilmelding, setFeilmelding] = useState(false);

  useQuery(GET_PERMLISTE, {
    onCompleted(data) {
      dispatch(getPermliste(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleSorter = (kolonne) => {
    if (kolonne === sorter) {
      setAsc(!asc);
    } else {
      setAsc(true);
    }
    setSorter(kolonne);
  };

  // Sorterer etter valgt kolonne:
  const compare = (a, b) => {
    let objA;
    let objB;

    if (sorter === "navn") {
      objA = a.fornavn.toUpperCase() + a.mellomnavn.toUpperCase() + a.etternavn.toUpperCase();
      objB = b.fornavn.toUpperCase() + b.mellomnavn.toUpperCase() + b.etternavn.toUpperCase();
    } else {
      objA = _.get(a, sorter).toUpperCase();
      objB = _.get(b, sorter).toUpperCase();
    }

    let comparison = 0;
    if (asc) {
      if (objA > objB) {
        comparison = 1;
      } else if (objA < objB) {
        comparison = -1;
      }
    } else {
      if (objA > objB) {
        comparison = -1;
      } else if (objA < objB) {
        comparison = 1;
      }
    }

    return comparison;
  };

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Navn</TableCell>
              <TableCell>Ans</TableCell>
              <TableCell>Alk</TableCell>
              <TableCell>Rom</TableCell>
              <TableCell>Rolle</TableCell>
              <TableCell>Kundenummer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beboere.sort(compare).map((beboer) => {
              return (
                <TableRow key={beboer.id}>
                  <TableCell>
                    <Avatar
                      variant="circular"
                      onClick={() => props.toggleBeboer(beboer.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      style={{ cursor: "pointer" }}
                      onClick={() => props.toggleBeboer(beboer.id)}
                    >
                      {beboer.mellomnavn
                        ? `${beboer.fornavn} ${beboer.mellomnavn} ${beboer.etternavn}`
                        : `${beboer.fornavn} ${beboer.etternavn}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {beboer.epost}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textPrimary">
                      {beboer.ansiennitet}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textPrimary">
                      {beboer.alkoholdepositum ? "Ja" : "Nei"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip variant="outlined" avatar={<Avatar>#</Avatar>} label={beboer.rom.navn} />
                  </TableCell>
                  <TableCell>{beboer.rolle.navn}</TableCell>
                  <TableCell>{beboer.kundenr ? beboer.kundenr : <div style={{ color: "red" }}>Mangler</div>}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={feilmelding} autoHideDuration={6000} onClose={() => setFeilmelding(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default BeboerListeAnsiennitet;
