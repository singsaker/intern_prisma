import React, { useState } from "react";

import "simplebar/src/simplebar.css";

// Components
import Kunngjoringer from "../components/hjem/Kunngjoringer";
import KunngjoringCard from "../components/hjem/KunngjoringCard";
import Bursdag from "../components/hjem/Bursdag";
import Layout from "../components/Layout";
import Kalender from "../components/hjem/Kalender";
import KalenderCard from "../components/hjem/KalenderCard";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";

// Next
import Head from "next/head";

const Hjem = () => {
  const [kunngjoringModal, setKunngjoringModal] = useState(false);
  const [kunngjoringId, setKunngjoringId] = useState(null);

  const [seDetaljertDag, setSeDetaljertDag] = useState(false);
  const [dato, setDato] = useState(0);
  const [bursdager, setBursdager] = useState([])

  const toggleKunngjoringModal = (id) => {
    if (!kunngjoringModal) {
      setKunngjoringId(id);
    }
    setKunngjoringModal(!kunngjoringModal);
  };

  const toggleSeDetaljertDag = (dato, bursdager) => {
    if (!seDetaljertDag) {
      setDato(dato);
      setBursdager(bursdager);
    }
    console.log(dato);
    setSeDetaljertDag(!seDetaljertDag);
  }

  return (
    <Layout>
      <Head>
        <title>Hjem | Internsida</title>
      </Head>

      {/* Kunngjøringsmodal: */}
      <Dialog fullWidth maxWidth="md" open={kunngjoringModal} onClose={() => toggleKunngjoringModal}>
        <KunngjoringCard toggleKunngjoringModal={() => toggleKunngjoringModal} kunngjoringId={kunngjoringId} />
      </Dialog>

      <Dialog open={seDetaljertDag} onClose={toggleSeDetaljertDag}>
        <KalenderCard toggleSeDetaljertDag={toggleSeDetaljertDag} dato={dato} bursdager={bursdager} />
      </Dialog>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Kunngjoringer toggleKunngjoringModal={(id) => toggleKunngjoringModal(id)} />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* TODO: Fikse denne komponenten. Det er noe her som rendres i loop! */}
          <Bursdag />
        </Grid>
        <Grid item xs={12} md={6}>
          <Kalender toggleSeDetaljertDag={toggleSeDetaljertDag} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Hjem;
