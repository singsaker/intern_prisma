import React, { useState } from "react";

// NextJS
import Head from "next/head";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";

// Components
import RolleOversikt from "../../../components/utvalget/romsjef/RolleOversikt";
import ProfilRediger from "../../../components/utvalget/romsjef/profil/ProfilRediger";
import BeboerListe from "../../../components/utvalget/romsjef/BeboerListe";
import Layout from "../../../components/Layout";
import Kontrollpanel from "../../../components/utvalget/romsjef/Kontrollpanel";
import StudieAdmin from "../../../components/utvalget/romsjef/StudieAdmin";
import Navigasjon from "../../../components/utvalget/romsjef/Navigasjon";
import NyBeboerInput from "../../../components/utvalget/romsjef/soknad/NyBeboerInput";

const Romsjef = () => {
  const [beboerModal, setBeboerModal] = useState(false);
  const [studieAdminModal, setStudieAdminModal] = useState(false);
  const [nyBeboerModal, setNyBeboerModal] = useState(false);
  const [beboerId, setBeboerId] = useState(null);

  const toggleBeboerModal = (id) => {
    if (!beboerModal) {
      setBeboerId(id);
    }
    setBeboerModal(!beboerModal);
  };

  const toggleStudieAdminModal = () => {
    setStudieAdminModal(!studieAdminModal);
  };

  const toggleNyBeboer = () => {
    setNyBeboerModal(!nyBeboerModal);
  };

  return (
    <Layout>
      <Head>
        <title>Romsjef | Internsida</title>
      </Head>

      {/* Beboermodal: */}
      <Dialog maxWidth="sm" fullWidth onClose={toggleBeboerModal} open={beboerModal}>
        <ProfilRediger toggleBeboer={() => toggleBeboerModal(null)} beboer_id={beboerId} />
      </Dialog>

      {/* Studieadminmodal */}
      <Dialog fullWidth maxWidth="sm" onClose={toggleStudieAdminModal} open={studieAdminModal}>
        <StudieAdmin toggleStudieAdmin={toggleStudieAdminModal} />
      </Dialog>

      {/* Ny beboer-modal */}
      <Dialog fullWidth maxWidth="sm" onClose={toggleNyBeboer} open={nyBeboerModal}>
        <Grid container justify="flex-end" item xs={12}>
          <CloseIcon onClick={() => toggleNyBeboer()} style={{ cursor: "pointer", margin: "8px" }} />
        </Grid>
        <NyBeboerInput toggleNyBeboer={toggleNyBeboer} />
      </Dialog>

      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Grid item xs={12} md={8}>
            <BeboerListe toggleBeboer={(id) => toggleBeboerModal(id)} />
          </Grid>
          <Grid container direction="column" item md={4} xs={12} spacing={2}>
            <Grid item>
              <RolleOversikt />
            </Grid>
            <Grid item>
              <Kontrollpanel toggleNyBeboer={toggleNyBeboer} toggleStudieAdmin={toggleStudieAdminModal} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Romsjef;
