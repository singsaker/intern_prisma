import React, { useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

// Next
import Head from "next/head";

// Components
import Layout from "../components/Layout";
import Registrer from "../components/regi/Registrer";
import MinRegi from "../components/regi/MinRegi";
import RegiOversikt from "../components/regi/RegiOversikt";

const Regi = () => {
  const [semester, setSemester] = useState("");

  return (
    <Layout>
      <Head>
        <title>Regi | Internsida</title>
      </Head>
      <Container className="py-4" fluid>
        <Row>
          <Col className="pb-4" xl={6} lg={8} md={12}>
            <Registrer />
          </Col>
          <Col xl={6} lg={8} md={12}>
            <Row>
              <Col className="pb-4">
                <MinRegi setSemester={(sem) => setSemester(sem)} />
              </Col>
            </Row>
            <Row>
              <Col className="pb-4" xl={6}>
                <RegiOversikt semester={semester} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Regi;
