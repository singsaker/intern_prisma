import React, { useState } from "react";

import Layout from "../../../components/Layout";
import Navigasjon from "../../../components/utvalget/romsjef/Navigasjon";
import PermListe from "../../../components/utvalget/romsjef/PermListe";
import ProfilRediger from "../../../components/utvalget/romsjef/profil/ProfilRediger";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import Head from "next/head";

const Permliste = () => {
  const [beboerModal, setBeboerModal] = useState(false);
  const [beboerId, setBeboerId] = useState(null);

  const toggleBeboerModal = (id) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };

  return (
    <Layout>
      <Head>
        <title>Permliste | Internsida</title>
      </Head>

      {/* Beboermodal: */}
      <Dialog maxWidth="sm" fullWidth onClose={toggleBeboerModal} open={beboerModal}>
        <ProfilRediger toggleBeboer={() => toggleBeboerModal(null)} beboer_id={beboerId} perm={true} />
      </Dialog>

      <Grid container spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>
        <Grid item xs={12}>
          <PermListe toggleBeboer={(id) => toggleBeboerModal(id)} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Permliste;
