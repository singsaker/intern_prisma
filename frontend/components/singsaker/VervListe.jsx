import React, { useState } from "react";

// Components
import Spinner from "../CustomSpinner";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getVerv } from "../../src/actions/beboer";
import { GET_VERV } from "../../src/query/verv";

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
import { Typography } from "@material-ui/core";

const VervListe = (props) => {
  const dispatch = useDispatch();
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const verv = useSelector((state) => Object.values(state.verv.verv));
  const { loading } = useQuery(GET_VERV, {
    onCompleted(data) {
      dispatch(getVerv(data));
    },
    onError(error) {
      console.log(error);
    },
  });
  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);

  // eslint-disable-next-line no-unused-vars
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

  if (loading) return <Spinner />;

  return (
    <Paper xs={{ width: "100%" }}>
      <TableContainer xs={{ maxHeight: "650px" }}>
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
                              onClick={() => props.toggleBeboer(beboer.id)}
                            >
                              {beboer.fornavn} {beboer.etternavn}
                            </Typography>
                          );
                        })
                      ) : (
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          style={{ cursor: "pointer" }}
                          onClick={() => props.toggleAapmendListe(aapmend)}
                        >
                          {aapmend.length} åpmend
                        </Typography>
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
};

export default VervListe;
