import React, { useState, useEffect } from "react";

// Components
import Layout from "../../../components/Layout";
import Navigasjon from "../../../components/utvalget/romsjef/Navigasjon";
import StorhybellisteListe from "../../../components/utvalget/romsjef/storhybelliste/StorhybellisteListe";
import StorhybellisteModal from "../../../components/utvalget/romsjef/storhybelliste/Storhybelliste";
import Kontrollpanel from "../../../components/utvalget/romsjef/storhybelliste/Kontrollpanel";
import NyListeModal from "../../../components/utvalget/romsjef/storhybelliste/NyListeModal";

// Redux
import { GET_ALLE_ROM, LAG_STORHYBELLISTE } from "../../../src/query/rom";
import { getAlleRom, lagStorhybelliste } from "../../../src/actions/rom";
import { GET_BEBOERE } from "../../../src/query/beboer";
import { getBeboere } from "../../../src/actions/beboer";
import { useDispatch, useSelector } from "react-redux";

import { useLazyQuery, useMutation } from "@apollo/react-hooks";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/core/Alert";

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

  const [lagStorhybellisteMutation] = useMutation(LAG_STORHYBELLISTE, {
    onCompleted(data) {
      if (data.lagStorhybelliste && data.lagStorhybelliste !== null) {
        dispatch(lagStorhybelliste(data));
        setMelding(`"${data.lagStorhybelliste.navn}" ble lagt til!`);
        setVellykket(true);
        setVisAlert(true);
        setNyListeModal(false);
      } else {
        setMelding("Noe gikk galt!");
        setVellykket(false);
        setVisAlert(true);
      }
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

  const handleLagStorhybelliste = ({ navn, aar, semester, rom, beboere }) => {
    if (navn.length < 1) {
      setMelding("Du må gi et navn til listen");
      setVellykket(false);
      setVisAlert(true);
      return;
    }
    if (!Number.isInteger(Number(aar))) {
      setMelding("År må være et nummer!");
      setVellykket(false);
      setVisAlert(true);
      return;
    }

    if (!auth.tilgang.utvalget && !auth.tilgang.data) {
      setMelding("Brukeren din har ikke tilgang til å lage storhybelliste!");
      setVellykket(false);
      setVisAlert(true);
      return;
    }

    lagStorhybellisteMutation({
      variables: {
        navn: navn,
        semester: semester + "-" + String(aar),
        rom: rom,
        beboere: beboere,
      },
    });
  };

  return (
    <Layout>
      <Head>
        <title>Storhybelliste | Internsida</title>
      </Head>

      {/* Listemodal */}
      <Dialog maxWidth="md" fullWidth open={listeModal} onClose={toggleListeModal}>
        <StorhybellisteModal
          id={listeId}
          handleLagStorhybelliste={handleLagStorhybelliste}
          toggleListeModal={() => toggleListeModal(null)}
        />
      </Dialog>

      {/* Ny liste-modal */}
      <Dialog maxWidth="md" fullWidth open={nyListeModal} onClose={toggleNyListe}>
        <NyListeModal handleLagStorhybelliste={handleLagStorhybelliste} toggleNyListe={toggleNyListe} />
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
