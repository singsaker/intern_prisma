import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { GET_ALLE_STORHYBELLISTER } from "../../../../src/query/storhybelliste";
import { getAlleStorhybellister } from "../../../../src/actions/storhybelliste";

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

import NotStartedIcon from "@mui/icons-material/NotStarted";
import PauseIcon from "@mui/icons-material/Pause";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
      console.log(err.message);
      setMelding(err.message);
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
              <TableCell>Status</TableCell>
              <TableCell>Påmelding begynner</TableCell>
              <TableCell>Velging begynner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storhybellister.map((liste) => {
              let statusIkon = <NotStartedIcon />;
              let paamelding = "Ikke satt";
              let velging = "Ikke satt";

              if (liste.paamelding_start) {
                paamelding = new Date(liste.paamelding_start).toLocaleString();
              }

              if (liste.velging_start) {
                velging = new Date(liste.velging_start).toLocaleString();
              }

              if (liste.status == 1) {
                statusIkon = <PersonAddIcon />;
              } else if (liste.status == 2) {
                statusIkon = <PlayArrowIcon />;
              }

              return (
                <TableRow
                  //onClick={() => props.toggleListeModal(liste.id)}
                  key={liste.id}
                  hover
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{liste.navn}</TableCell>
                  <TableCell>{statusIkon}</TableCell>
                  <TableCell>{paamelding}</TableCell>
                  <TableCell>{velging}</TableCell>
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
