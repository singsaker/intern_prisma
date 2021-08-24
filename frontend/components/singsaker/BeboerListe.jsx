import React, { useState } from "react";

// Components
import Spinner from "../CustomSpinner";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getBeboere } from "../../src/actions/beboer";
import { GET_BEBOERE } from "../../src/query/beboer";

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
import Chip from "@material-ui/core/Chip";

const BeboerListe = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);

  const { loading } = useQuery(GET_BEBOERE, {
    onCompleted(data) {
      dispatch(getBeboere(data));
    },
    onError(error) {
      console.log(error);
    },
  });

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
      objA =
        a.fornavn.toUpperCase() +
        a.mellomnavn.toUpperCase() +
        a.etternavn.toUpperCase();
      objB =
        b.fornavn.toUpperCase() +
        b.mellomnavn.toUpperCase() +
        b.etternavn.toUpperCase();
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

  if (loading || beboere.length < 1) return <Spinner />;
  return (
    <Paper xs={{width: "100%"}}>
      <TableContainer xs={{maxHeight: "650px"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Navn</TableCell>
              <TableCell>Skole</TableCell>
              <TableCell>Rom</TableCell>
              <TableCell>Rolle</TableCell>
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
                      {beboer.studie && beboer.studie.navn}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {beboer.skole.navn}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      variant="outlined"
                      avatar={<Avatar>#</Avatar>}
                      label={beboer.rom && beboer.rom.navn}
                    />
                  </TableCell>
                  <TableCell>{beboer.rolle.navn}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BeboerListe;
