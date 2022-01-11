import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { GET_ALLE_STORHYBELLISTER } from "../../../../src/query/rom";
import { getAlleStorhybellister } from "../../../../src/actions/rom";

// Misc
import { useLazyQuery } from "@apollo/client";

// Material UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const StorhybellisteListe = (props) => {
  const dispatch = useDispatch();
  const storhybellister = useSelector((state) => Object.values(state.rom.storhybellister));
  const auth = useSelector((state) => state.auth);
  const [melding, setMelding] = useState("");
  const [vellykket, setVellykket] = useState(false);
  const [visAlert, setVisAlert] = useState(false);

  const [getAlleStorhybellisterQuery, { loading }] = useLazyQuery(GET_ALLE_STORHYBELLISTER, {
    onCompleted(data) {
      dispatch(getAlleStorhybellister(data));
    },
    onError(err) {
      setMelding(err.message);
      console.log(err.message);
      setVellykket(false);
      //setVisAlert(true);
    },
  });

  useEffect(() => {
    if (
      Number.isInteger(auth.beboer_id) &&
      Number.isInteger(auth.bruker_id) &&
      (auth.tilgang.utvalget || auth.tilgang.data)
    ) {
      getAlleStorhybellisterQuery();
    }
  }, [auth]);

  if (loading)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Navn</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Nåverende velger</TableCell>
              <TableCell>Neste</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storhybellister.map((liste) => {
              return (
                <TableRow
                  onClick={() => props.toggleListeModal(liste.id)}
                  key={liste.id}
                  hover
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{liste.navn}</TableCell>
                  <TableCell>{liste.semester}</TableCell>
                  <TableCell>{liste.aktiv ? <AccessTimeIcon /> : <DoneIcon />}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={visAlert} autoHideDuration={6000} onClose={() => setVisAlert(false)}>
        <Alert onClose={() => setVisAlert(false)} severity={vellykket ? "success" : "error"}>
          {melding}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default StorhybellisteListe;
