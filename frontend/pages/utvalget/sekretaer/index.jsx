import React, { useState } from "react";

import Layout from "../../../components/Layout";
import Navigasjon from "../../../components/utvalget/sekretaer/Navigasjon";
import VervListe from "../../../components/utvalget/sekretaer/aapmandsverv/VervListe";
import ProfilCard from "../../../components/ProfilCard";
import VervAdminDialog from "../../../components/utvalget/sekretaer/aapmandsverv/VervAdminDialog";

import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";

import Head from "next/head";

const Sekretaer = () => {
  const [beboerId, setBeboerId] = useState(null);
  const [beboerModal, setBeboerModal] = useState(false);
  const [vervId, setVervId] = useState(null);
  const [vervModal, setVervModal] = useState(false);

  const toggleBeboerModal = (id) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };

  const toggleVervModal = (id) => {
    if (!vervModal) {
      setVervId(id);
    }
    setVervModal(!vervModal);
  };

  return (
    <Layout>
      <Head>
        <title>Åpmandsverv | Internsida</title>
      </Head>

      {/* Beboermodal */}
      <Dialog onClose={toggleBeboerModal} open={beboerModal}>
        <ProfilCard beboer_id={beboerId} />
      </Dialog>

      {/* Vervadminmodal */}
      <VervAdminDialog verv_id={vervId} onClose={toggleVervModal} open={vervModal} />

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item md={6}>
            <VervListe
              toggleVervModal={(id) => toggleVervModal(id)}
              toggleBeboerModal={(id) => toggleBeboerModal(id)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Sekretaer;
