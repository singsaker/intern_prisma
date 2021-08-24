import React, { useState, useEffect } from "react";

import { GET_KUNNGJORNGER } from "../../src/query/kunngjoring";
import { getKunngjoringer } from "../../src/actions/kunngjoring";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import sekunderTilTid from "../../helpers/sekunderTilTid";

// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import AnnouncementIcon from "@material-ui/icons/Announcement";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Kunngjoringer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const kunngjoringer = useSelector((state) =>
    Object.values(state.kunngjoring)
  );
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
      <Grid container justify="center">
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
                    <Typography
                      variant="body1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {kunngjoring.tittel}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        {kunngjoring.beboer.fornavn +
                          " " +
                          kunngjoring.beboer.etternavn}

                        {kunngjoring.tekst &&
                          " — " +
                            String(kunngjoring.tekst.substr(0, 50) + "...")}
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
        <List component="nav" className={classes.root}>
          {kunngjoringTable}
        </List>
      </CardContent>
      <Snackbar
        open={visAlert}
        autoHideDuration={6000}
        onClose={() => setVisAlert(false)}
      >
        <Alert
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
