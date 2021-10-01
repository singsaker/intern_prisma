import React from "react";

// Material-UI
import { Breadcrumbs, Typography, Link, Box } from "@mui/material";

// Redux
// import { useSelector } from "react-redux";

// Next
import Head from "next/head";

// Components
import Innstillinger from "../components/profil/Innstillinger";
import Layout from "../components/Layout";

const MinSide = () => {
  // const beboer_id = useSelector((state) => state.auth.beboer_id);

  return (
    <Layout>
      <Head>
        <title>Profil | Internsida</title>
      </Head>

      <Typography variant="h4" gutterBottom>
        Beboer
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Hjem
        </Link>
        <Link underline="hover" color="inherit" href="/profil">
          Beboer
        </Link>
        <Typography color="text.primary">Innstillinger</Typography>
      </Breadcrumbs>

      <Box sx={{ mt: 5 }}>
        <Innstillinger />
      </Box>
    </Layout>
  );
};

export default MinSide;
