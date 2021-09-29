import React, { useState, useEffect } from "react";

import Layout from "../../../components/Layout";
import Navigasjon from "../../../components/utvalget/romsjef/Navigasjon";
import BeboerListe from "../../../components/utvalget/romsjef/ansiennitet/BeboerListeAnsiennitet";
import Kontrollpanel from "../../../components/utvalget/romsjef/ansiennitet/Kontrollpanel";

import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { oppdaterAnsiennitet } from "../../../src/actions/beboer";
import { UPDATE_BEBOERE_ANSIENNITET } from "../../../src/query/beboer";

import Head from "next/head";
import _ from "lodash";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Ansiennitet = () => {
  const [antallValgte, setAntallValgte] = useState(0);
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const [valgt, setValgt] = useState([]);
  const [ansiennitet, setAnsiennitet] = useState({});
  const dispatch = useDispatch();

  const [vellykket, setVellykket] = useState(false);
  const [feilmelding, setFeilmelding] = useState(false);
  const [melding, setMelding] = useState("");

  const [oppdaterAnsiennitetMutation] = useMutation(UPDATE_BEBOERE_ANSIENNITET, {
    onCompleted(data) {
      setMelding("Ansiennitet ble oppdatert!");
      setVellykket(true);
      dispatch(oppdaterAnsiennitet(data));
    },
    onError(error) {
      setMelding(error.message);
      setFeilmelding(true);
    },
  });

  // Lager en liste med alle beboeres ansiennitet:
  useEffect(() => {
    initAnsiennitet();
  }, [beboere.length]);

  const initAnsiennitet = () => {
    const beboerAns = _.mapKeys(beboere, (beb) => {
      return beb.id;
    });
    const test = _.mapValues(beboerAns, (a) => {
      return a.ansiennitet ? Number(a.ansiennitet) : 0;
    });
    setAnsiennitet(test);
  };

  // Oppdaterer antall valgte beboere:
  useEffect(() => {
    oppdaterValgte(valgt.length);
  }, [valgt, ansiennitet]);

  const oppdaterValgte = (antall) => {
    setAntallValgte(antall);
  };

  // Tar seg av "velg alle knappen":
  const handleVelgAlle = (event) => {
    if (event.target.checked) {
      const nyeValgt = beboere.map((b) => b.id);
      setValgt(nyeValgt);
      return;
    }
    setValgt([]);
  };

  // Tar seg av velging av beboer:
  const handleVelg = (id) => {
    const valgtRad = valgt.indexOf(id);
    let nyeValgt = [];

    if (valgtRad === -1) {
      nyeValgt = nyeValgt.concat(valgt, id);
    } else if (valgtRad === 0) {
      nyeValgt = nyeValgt.concat(valgt.slice(1));
    } else if (valgtRad === valgt.length - 1) {
      nyeValgt = nyeValgt.concat(valgt.slice(0, -1));
    } else if (valgtRad > 0) {
      nyeValgt = nyeValgt.concat(valgt.slice(0, valgtRad), valgt.slice(valgtRad + 1));
    }

    setValgt(nyeValgt);
  };

  // Oppdaterer ansiennitetverdien:
  const handleAnsiennitetChange = (id, verdi) => {
    setAnsiennitet({
      ...ansiennitet,
      [id]: Number(verdi),
    });
  };

  const handleInkrementerAlle = () => {
    let nyAnsiennitet = {};
    _.forIn(ansiennitet, (value, key) => {
      nyAnsiennitet[key] = value + 1;
    });
    setAnsiennitet(nyAnsiennitet);
  };

  const handleInkrementerValgte = () => {
    let nyAnsiennitet = ansiennitet;
    valgt.forEach((id) => {
      nyAnsiennitet[id] = ansiennitet[id] + 1;
    });
    setAnsiennitet(nyAnsiennitet);
    setValgt([]);
  };

  const handleLagre = () => {
    let beboereId = [];
    beboere.forEach((beb) => {
      const ans = beb.ansiennitet !== null ? beb.ansiennitet : 0;
      if (ans != ansiennitet[beb.id]) {
        beboereId.push({
          beboerId: beb.id,
          ansiennitet: Number(ansiennitet[beb.id]),
        });
      }
    });

    if (beboereId.length > 0) {
      oppdaterAnsiennitetMutation({
        variables: {
          data: beboereId,
        },
      });
    } else {
      console.log("Ingen å oppdatere");
    }
  };

  const handleLagreValgt = (id) => {
    oppdaterAnsiennitetMutation({
      variables: {
        data: [
          {
            beboerId: id,
            ansiennitet: Number(ansiennitet[id]),
          },
        ],
      },
    });
  };

  return (
    <Layout>
      <Head>
        <title>Ansiennitet | Internsida</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item>
          <Navigasjon />
        </Grid>

        <Grid item xs={12} md={8}>
          <BeboerListe
            handleVelgAlle={(e) => handleVelgAlle(e)}
            handleVelg={(e, id) => handleVelg(e, id)}
            handleAnsiennitetChange={(id, verdi) => handleAnsiennitetChange(id, verdi)}
            oppdaterValgte={(antall) => oppdaterValgte(antall)}
            valgt={valgt}
            ansiennitet={ansiennitet}
            handleLagreValgt={(id) => handleLagreValgt(id)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Kontrollpanel
            handleInkrementerAlle={() => handleInkrementerAlle()}
            handleInkrementerValgte={() => handleInkrementerValgte()}
            antallValgte={antallValgte}
            handleResett={() => initAnsiennitet()}
            handleLagre={() => handleLagre()}
          />
        </Grid>
      </Grid>
      <Snackbar open={vellykket} autoHideDuration={6000} onClose={() => setVellykket(false)}>
        <Alert onClose={() => setVellykket(false)} severity="success">
          {melding}
        </Alert>
      </Snackbar>
      <Snackbar open={feilmelding} autoHideDuration={6000} onClose={() => setFeilmelding(false)}>
        <Alert onClose={() => setFeilmelding(false)} severity="error">
          {melding}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Ansiennitet;
