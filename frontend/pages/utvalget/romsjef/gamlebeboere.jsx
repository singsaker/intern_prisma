import React, { useState } from "react";

// NextJS
import Head from "next/head";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import Layout from "../../../components/Layout";
import ProfilRediger from "../../../components/utvalget/romsjef/profil/ProfilGammelRediger";
import GammelBeboerListe from "../../../components/utvalget/romsjef/GammelBeboerListe";
import Navigasjon from "../../../components/utvalget/romsjef/Navigasjon";

const GamleBeboere = () => {
  const [beboerModal, setBeboerModal] = useState(false);
  const [beboerId, setBeboerId] = useState(null);

  const toggleGammelBeboer = (id) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };

  return (
    <Layout>
      <Head>
        <title>Gammel Beboerliste | Internsida</title>
      </Head>
      {/* Beboermodal: */}
      <Dialog maxWidth="sm" fullWidth onClose={toggleGammelBeboer} open={beboerModal}>
        <ProfilRediger toggleBeboer={() => toggleGammelBeboer(null)} beboer_id={beboerId} gammelBeboer={true} />
      </Dialog>

      <Grid container spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>
        <Grid item xs={12}>
          <GammelBeboerListe toggleGammelBeboer={(id) => toggleGammelBeboer(id)} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default GamleBeboere;
