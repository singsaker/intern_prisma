import React, { useState } from "react";

import Layout from "../../../../components/Layout";
import Head from "next/head";
import Navigasjon from "../../../../components/utvalget/romsjef/Navigasjon";
import SoknadModal from "../../../../components/utvalget/romsjef/soknad/SoknadModal";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";

import SoknadListe from "../../../../components/utvalget/romsjef/soknad/SoknadListe";
import Kontrollpanel from "../../../../components/utvalget/romsjef/soknad/Kontrollpanel";
import { isString, isInteger } from "lodash";

const Soknader = () => {
  const [semester, setSemester] = useState(new Date().getMonth() < 6 ? "vaar" : "host");
  const [aar, setAar] = useState(new Date().getFullYear());
  const [valgtSoknadId, setValgtSoknadId] = useState(null);
  const [valgtSoknadSemester, setValgtSoknadSemeter] = useState("");
  const [soknadModal, setSoknadModal] = useState(false);

  const handleSemesterChange = (verdi) => {
    setSemester(verdi);
  };

  const handleAarChange = (verdi) => {
    setAar(verdi);
  };

  const toggleSoknadModal = (id, semester) => {
    if (isInteger(id) && isString(semester)) {
      setValgtSoknadId(id);
      setValgtSoknadSemeter(semester);
    }
    setSoknadModal(!soknadModal);
  };

  return (
    <Layout>
      <Head>
        <title>Søknader | Internsida</title>
      </Head>

      {/* Søknadmodal */}
      <Dialog fullWidth maxWidth="md" onClose={toggleSoknadModal} open={soknadModal}>
        <SoknadModal id={valgtSoknadId} semester={valgtSoknadSemester} />
      </Dialog>

      <Grid container spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>
        <Grid item xs={12} md={8}>
          <SoknadListe
            toggleSoknadModal={(id, semester) => toggleSoknadModal(id, semester)}
            aar={aar}
            semester={semester}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Kontrollpanel
            handleSemesterChange={(verdi) => handleSemesterChange(verdi)}
            handleAarChange={(verdi) => handleAarChange(verdi)}
            aar={aar}
            semester={semester}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Soknader;
