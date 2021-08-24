import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getSoknaderSemester } from "../../../../src/actions/soknad";
import { GET_SOKNADER_SEMESTER } from "../../../../src/query/soknad";

// Misc
import _, { isDate } from "lodash";
import { useLazyQuery } from "@apollo/react-hooks";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import formaterDato from "../../../../helpers/formaterDato";
import DOMPurify from "dompurify";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "700px",
  },
});

const SoknadListe = (props) => {
  const dispatch = useDispatch();
  const soknader = useSelector((state) => state.soknader);
  const [sorter, setSorter] = useState("navn");
  const [asc, setAsc] = useState(true);
  const classes = useStyles();
  const valgtSemester = String(props.aar) + props.semester;

  const [getSoknaderQuery, { loading }] = useLazyQuery(GET_SOKNADER_SEMESTER, {
    onCompleted(data) {
      dispatch(getSoknaderSemester(data));
    },
    onError(error) {
      console.log(error);
    },
    variables: {
      semester: props.semester,
      aar: Number(props.aar),
    },
  });

  useEffect(() => {
    getSoknaderQuery();
  }, [props.aar, props.semester]);

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

  return (
    <Paper variant="outlined" className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Innsendt</TableCell>
              <TableCell>Søker</TableCell>
              <TableCell>Født</TableCell>
              <TableCell>Fagbrev</TableCell>
              <TableCell>Kjenner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {soknader[valgtSemester] &&
              Object.values(soknader[valgtSemester]).map((soknad) => {
                const innsendt = isDate(new Date(Number(soknad.innsendt)))
                  ? new Date(Number(soknad.innsendt)).toISOString()
                  : "Nei";
                return (
                  <TableRow key={soknad.id}>
                    <TableCell>
                      {formaterDato(innsendt.split("T")[0])}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          props.toggleSoknadModal(soknad.id, valgtSemester)
                        }
                      >
                        {soknad.navn}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {soknad.epost}
                      </Typography>
                    </TableCell>
                    <TableCell>{soknad.fodselsar}</TableCell>
                    <TableCell
                      style={
                        soknad.fagbrev ? { color: "yellow" } : { color: "red" }
                      }
                    >
                      {soknad.fagbrev ? "Ja" : "Nei"}
                    </TableCell>
                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(soknad.kjenner),
                        }}
                      />
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

export default SoknadListe;
