import React, { useState } from "react";

import 'simplebar/src/simplebar.css';

// Components
import Kunngjoringer from "../components/hjem/Kunngjoringer";
import KunngjoringCard from "../components/hjem/KunngjoringCard";
import Bursdag from "../components/hjem/Bursdag";
import Layout from "../components/Layout";
import ProfilCard from "../components/ProfilCard";

import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";

// Next
import Head from "next/head";

const Hjem = () => {
  const [kunngjoringModal, setKunngjoringModal] = useState(false);
  const [beboerModal, setBeboerModal] = useState(false);
  const [kunngjoringId, setKunngjoringId] = useState(null);
  const [bdagbarnId, setBdagbarnId] = useState(null);

  const toggleKunngjoringModal = (id) => {
    if (!kunngjoringModal) {
      setKunngjoringId(id);
    }
    setKunngjoringModal(!kunngjoringModal);
  };

  const toggleBeboerModal = (id) => {
    if (!beboerModal) {
      setBdagbarnId(id);
    }
    setBeboerModal(!beboerModal);
  };

  return (
    <Layout>
      <Head>
        <title>Hjem | Internsida</title>
      </Head>

      {/* Kunngjøringsmodal: */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={kunngjoringModal}
        onClose={toggleKunngjoringModal}
      >
        <KunngjoringCard
          toggleKunngjoringModal={toggleKunngjoringModal}
          kunngjoringId={kunngjoringId}
        />
      </Dialog>

      {/* Beboermodal: */}
      <Dialog open={beboerModal} onClose={toggleBeboerModal}>
        <ProfilCard
          beboer_id={bdagbarnId}
          toggleBeboerModal={toggleBeboerModal}
        />
      </Dialog>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Kunngjoringer
            toggleKunngjoringModal={(id) => toggleKunngjoringModal(id)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Bursdag toggleBeboerModal={(id) => toggleBeboerModal(id)} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Hjem;
