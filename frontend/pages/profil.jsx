import React from "react";

// Material-UI
import Grid from "@material-ui/core/Grid";

// Redux
import { useSelector } from "react-redux";

// Next
import Head from "next/head";

// Components
import ProfilCard from "../Components/ProfilCard";
import Innstillinger from "../components/profil/Innstillinger";
import Layout from "../components/Layout";

const MinSide = () => {
  const beboer_id = useSelector((state) => state.auth.beboer_id);

  return (
    <Layout>
      <Head>
        <title>Profil | Internsida</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item md={5}>
          <ProfilCard beboer_id={beboer_id} />
        </Grid>
        <Grid item md={7}>
          <Innstillinger />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MinSide;
