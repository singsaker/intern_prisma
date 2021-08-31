/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getVerv, getBeboere } from "../../../../src/actions/beboer";
import { GET_VERV } from "../../../../src/query/verv";
import { GET_BEBOERE } from "../../../../src/query/beboer";

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
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const VervListe = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const verv = useSelector((state) => Object.values(state.verv.verv));
  const [melding, setMelding] = useState("");
  const [feilmelding, setFeilmelding] = useState(false);
  const [vellykket, setVellykket] = useState(false);

  useQuery(GET_VERV, {
    onCompleted(data) {
      dispatch(getVerv(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  useQuery(GET_BEBOERE, {
    onCompleted(data) {
      dispatch(getBeboere(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);

  const handleSorter = (kolonne) => {
    if (kolonne === sorter) {
      setAsc(!asc);
    } else {
      setAsc(true);
    }
    setSorter(kolonne);
  };

  const compare = (a, b) => {
    const objA = _.get(a, sorter) !== null || _.get(a, sorter).length !== 0 ? _.get(a, sorter).toUpperCase() : null;
    const objB = _.get(b, sorter) !== null || _.get(b, sorter).length !== 0 ? _.get(b, sorter).toUpperCase() : null;

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

  if (beboere.length > 0 && verv.length > 0) {
    return (
      <Paper variant="outlined">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Verv</TableCell>
                <TableCell>Åpmand/åpmend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {verv.sort(compare).map((vervet) => {
                const aapmend = vervet.aapmend.map((personId) => {
                  return beboere.filter((beboer) => {
                    return beboer.id === personId;
                  })[0];
                });
                return (
                  <TableRow key={vervet.id}>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        style={{ cursor: "pointer" }}
                        onClick={() => props.toggleVervModal(vervet.id)}
                      >
                        {vervet.navn}
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle2">
                        {vervet.epost}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {aapmend[0] &&
                        (aapmend.length === 1 ? (
                          aapmend.map((beboer) => {
                            return (
                              <Typography
                                variant="subtitle1"
                                color="textPrimary"
                                key={beboer.id}
                                style={{ cursor: "pointer" }}
                                onClick={() => props.toggleBeboerModal(beboer.id)}
                              >
                                {beboer.fornavn} {beboer.etternavn}
                              </Typography>
                            );
                          })
                        ) : (
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{aapmend.length} åpmend</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List component="nav" aria-label="main mailbox folders" dense>
                                {aapmend.map((beboer) => {
                                  return (
                                    <ListItem onClick={() => props.toggleBeboerModal(beboer.id)} button key={beboer.id}>
                                      <ListItemText primary={`${beboer.fornavn} ${beboer.etternavn}`} />
                                    </ListItem>
                                  );
                                })}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
  return (
    <Paper style={{ height: "200px" }}>
      <Grid container justify="center" style={{ padding: "65px" }}>
        <CircularProgress size={80} />
      </Grid>
    </Paper>
  );
};

export default VervListe;
