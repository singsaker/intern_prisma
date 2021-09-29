import React, { useState, useEffect } from "react";

import { GET_KUNNGJORNGER } from "../../src/query/kunngjoring";
import { getKunngjoringer } from "../../src/actions/kunngjoring";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import sekunderTilTid from "../../helpers/sekunderTilTid";

// Material-UI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import AnnouncementIcon from "@mui/icons-material/Announcement";

const Kunngjoringer = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const kunngjoringer = useSelector((state) => Object.values(state.kunngjoring));
  const [melding, setMelding] = useState("");
  const [vellykket, setVellykket] = useState(false);
  const [visAlert, setVisAlert] = useState(false);

  // Henter kunngjøringer:
  const [getKunngjoringerQuery, { loading }] = useLazyQuery(GET_KUNNGJORNGER, {
    onCompleted(data) {
      dispatch(getKunngjoringer(data));
    },
    onError(error) {
      setMelding(error.message);
      setVellykket(false);
      setVisAlert(true);
    },
  });

  const compare = (a, b) => {
    return new Date(b.publisert) - new Date(a.publisert);
  };

  useEffect(() => {
    if (Number.isInteger(auth.beboer_id) && Number.isInteger(auth.bruker_id)) {
      getKunngjoringerQuery();
    }
  }, [auth]);

  if (loading)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  const kunngjoringTable = kunngjoringer.sort(compare).map((kunngjoring) => {
    const date = new Date(kunngjoring.publisert);
    const now = new Date();
    const tidSiden = sekunderTilTid((now.getTime() - date.getTime()) / 1000);
    let displayTid = null;

    if (tidSiden.hours > 23) {
      displayTid = Math.floor(tidSiden.hours / 24) + "d";
    } else if (tidSiden.hours > 0) {
      displayTid = tidSiden.hours + "t";
    } else if (tidSiden.minutes > 0) {
      displayTid = tidSiden.minutes + "min";
    } else {
      displayTid = tidSiden.sec + "sek";
    }

    return (
      <React.Fragment key={kunngjoring.id}>
        <ListItem
          onClick={() => props.toggleKunngjoringModal(kunngjoring.id)}
          alignItems="flex-start"
          style={{ cursor: "pointer" }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ListItemAvatar>
                <Avatar>
                  <AnnouncementIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="textPrimary">
                      {kunngjoring.tittel}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="textSecondary">
                        {kunngjoring.beboer.fornavn + " " + kunngjoring.beboer.etternavn}

                        {kunngjoring.tekst && " — " + String(kunngjoring.tekst.substr(0, 50) + "...")}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Grid>
              <Grid item>
                <ListItemText secondary={displayTid} />
              </Grid>
            </Grid>
          </Grid>
        </ListItem>

        <Divider variant="inset" component="li" />
      </React.Fragment>
    );
  });

  return (
    <Card>
      <CardHeader title="Kunngjøringer" />
      <CardContent
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <List component="nav">{kunngjoringTable}</List>
      </CardContent>
      <Snackbar open={visAlert} autoHideDuration={6000} onClose={() => setVisAlert(false)}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setVisAlert(false)}
          severity={vellykket ? "success" : "error"}
        >
          {melding}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Kunngjoringer;
