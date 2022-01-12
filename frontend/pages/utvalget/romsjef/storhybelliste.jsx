import React, { useState, useEffect } from "react";

// Components
import Layout from "../../../components/Layout";
import Navigasjon from "../../../components/utvalget/romsjef/Navigasjon";
import StorhybellisteListe from "../../../components/utvalget/romsjef/storhybelliste/StorhybellisteListe";
import StorhybellisteModal from "../../../components/utvalget/romsjef/storhybelliste/Storhybelliste";
import Kontrollpanel from "../../../components/utvalget/romsjef/storhybelliste/Kontrollpanel";
import NyListeModal from "../../../components/utvalget/romsjef/storhybelliste/NyListeModal";

// Redux
import { GET_ALLE_ROM } from "../../../src/query/rom";
import { getAlleRom } from "../../../src/actions/rom";
import { GET_BEBOERE } from "../../../src/query/beboer";
import { getBeboere } from "../../../src/actions/beboer";
import { useDispatch, useSelector } from "react-redux";

import { useLazyQuery } from "@apollo/client";

// Material-UI
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// NextJS
import Head from "next/head";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Storhybelliste = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [listeId, setListeId] = useState(null);
  const [listeModal, setListeModal] = useState(false);
  const [nyListeModal, setNyListeModal] = useState(false);

  const [vellykket, setVellykket] = useState(false);
  const [visAlert, setVisAlert] = useState(false);
  const [melding, setMelding] = useState("");

  const [getAlleRomQuery] = useLazyQuery(GET_ALLE_ROM, {
    onCompleted(data) {
      console.log(data);
      dispatch(getAlleRom(data));
    },
    onError(err) {
      setMelding(err.message);
      setVellykket(false);
      setVisAlert(true);
    },
  });

  const [getAlleBeboereQuery] = useLazyQuery(GET_BEBOERE, {
    onCompleted(data) {
      dispatch(getBeboere(data));
    },
    onError(err) {
      setMelding(err.message);
      setVellykket(false);
      setVisAlert(true);
    },
  });

  useEffect(() => {
    if (Number.isInteger(auth.beboer_id) && Number.isInteger(auth.bruker_id)) {
      getAlleBeboereQuery();
      getAlleRomQuery();
    }
  }, [auth]);

  const toggleListeModal = (id) => {
    if (!listeModal) {
      setListeId(id);
    }
    setListeModal(!listeModal);
  };

  const toggleNyListe = () => {
    setNyListeModal(!nyListeModal);
  };

  return (
    <Layout>
      <Head>
        <title>Storhybelliste | Internsida</title>
      </Head>

      {/* Listemodal */}
      <Dialog maxWidth="md" fullWidth open={listeModal} onClose={toggleListeModal}>
        <StorhybellisteModal id={listeId} toggleListeModal={() => toggleListeModal(null)} />
      </Dialog>

      {/* Ny liste-modal */}
      <Dialog maxWidth="sm" fullWidth open={nyListeModal} onClose={toggleNyListe}>
        <NyListeModal toggleNyListe={toggleNyListe} />
      </Dialog>

      <Grid container spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>

        <Grid item xs={12} md={8}>
          <StorhybellisteListe toggleListeModal={toggleListeModal} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Kontrollpanel toggleNyListe={toggleNyListe} />
        </Grid>
      </Grid>
      <Snackbar open={visAlert} autoHideDuration={6000} onClose={() => setVisAlert(false)}>
        <Alert onClose={() => setVisAlert(false)} severity={vellykket ? "success" : "error"}>
          {melding}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Storhybelliste;
