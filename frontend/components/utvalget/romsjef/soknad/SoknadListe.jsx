import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getSoknaderSemester } from "../../../../src/actions/soknad";
import { GET_SOKNADER_SEMESTER } from "../../../../src/query/soknad";

// Misc
import { isDate } from "lodash";
import { useLazyQuery } from "@apollo/react-hooks";

// Material UI
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import formaterDato from "../../../../helpers/formaterDato";
import DOMPurify from "dompurify";

const SoknadListe = (props) => {
  const dispatch = useDispatch();
  const soknader = useSelector((state) => state.soknader);
  const valgtSemester = String(props.aar) + props.semester;

  const [getSoknaderQuery] = useLazyQuery(GET_SOKNADER_SEMESTER, {
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

  return (
    <Paper variant="outlined">
      <TableContainer>
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
                    <TableCell>{formaterDato(innsendt.split("T")[0])}</TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        style={{ cursor: "pointer" }}
                        onClick={() => props.toggleSoknadModal(soknad.id, valgtSemester)}
                      >
                        {soknad.navn}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {soknad.epost}
                      </Typography>
                    </TableCell>
                    <TableCell>{soknad.fodselsar}</TableCell>
                    <TableCell style={soknad.fagbrev ? { color: "yellow" } : { color: "red" }}>
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
