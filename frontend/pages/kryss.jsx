import React, { useEffect } from "react";

// Apollo
import { useLazyQuery } from "@apollo/react-hooks";

// Bootstrap
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

// Next
import Head from "next/head";

// Redux
import { GET_KRYSSEHISTORIKK } from "../src/query/kryss";
import { useDispatch, useSelector } from "react-redux";
import { getKrysseliste } from "../src/actions/kryss";

// Components
import Layout from "../components/Layout";
import Kryssehistorikk from "../components/kryss/Kryssehistorikk";

import { isInteger } from "lodash";

const Kryss = () => {
  const dispatch = useDispatch();
  const beboer_id = useSelector((state) => state.auth.beboer_id);
  const [hentKryssehistorikk] = useLazyQuery(GET_KRYSSEHISTORIKK, {
    onCompleted(data) {
      dispatch(getKrysseliste(data));
    },
  });

  useEffect(() => {
    if (isInteger(beboer_id)) {
      hentKryssehistorikk({
        variables: {
          beboerId: beboer_id,
        },
      });
    }
  }, [beboer_id]);
  return (
    <Layout>
      <Head>
        <title>Kryss | Internsida</title>
      </Head>
      <Container className="py-4" fluid>
        <Row>
          <Col md={6} xl={5} className="pb-1">
            <Kryssehistorikk />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Kryss;
