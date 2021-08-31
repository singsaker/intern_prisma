import React, { useState } from "react";

// Components
import Spinner from "../../CustomSpinner";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getGamleBeboere } from "../../../src/actions/beboer";
import { GET_GAMLE_BEBOERE } from "../../../src/query/beboer";

import formaterDato from "../../../helpers/formaterDato";
import formaterTelefon from "../../../helpers/formaterTelefon";

// Misc
import _ from "lodash";
import { useQuery } from "@apollo/react-hooks";

// Material UI
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/core/Alert";

const GammelBeboerListe = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.gamleBeboere));
  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);
  const [melding, setMelding] = useState("");
  const [feilmelding, setFeilmelding] = useState(false);

  const { loading } = useQuery(GET_GAMLE_BEBOERE, {
    onCompleted(data) {
      dispatch(getGamleBeboere(data));
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

  if (loading) return <Spinner />;

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Navn</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Født</TableCell>
              <TableCell>Flyttet ut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beboere.sort(compare).map((beboer) => {
              return (
                <TableRow key={beboer.id}>
                  <TableCell>
                    <Avatar
                      variant="circular"
                      onClick={() => props.toggleGammelBeboer(beboer.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      style={{ cursor: "pointer" }}
                      onClick={() => props.toggleGammelBeboer(beboer.id)}
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
                      {formaterTelefon(beboer.telefon)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textPrimary">
                      {formaterDato(beboer.fodselsdato)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textPrimary">
                      {beboer.romhistorikk.length > 0 &&
                        formaterDato(beboer.romhistorikk[beboer.romhistorikk.length - 1].utflyttet)}
                    </Typography>
                  </TableCell>
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

export default GammelBeboerListe;
