import React, { useState } from "react";

// Next
import Head from "next/head";

// Components
import Layout from "../components/Layout";
import Registrer from "../components/regi/Registrer";
import MinRegi from "../components/regi/MinRegi";
import RegiOversikt from "../components/regi/RegiOversikt";
import { Container } from "@mui/material";

const Regi = () => {
  const [semester, setSemester] = useState("");

  return (
    <Layout>
      <Head>
        <title>Regi | Internsida</title>
      </Head>
      <Container>
        <Registrer />

        <MinRegi setSemester={(sem) => setSemester(sem)} />

        <RegiOversikt semester={semester} />
      </Container>
    </Layout>
  );
};

export default Regi;
