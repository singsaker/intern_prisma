import React, { useState } from "react";

// Component imports
import DrikkeListe from "../../../components/utvalget/vaktsjef/DrikkeListe";
import Kontrollpanel from "../../../components/utvalget/vaktsjef/Kontrollpanel";
import NyDrikkeModal from "../../../components/utvalget/vaktsjef/NyDrikkeModal";
import OppdaterDrikkeModal from "../../../components/utvalget/vaktsjef/OppdaterDrikkeModal";
import Layout from "../../../components/Layout";
import Head from "next/head";

//Material UI
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const Drikke = (props) => {
    const [nyDrikkeModal, setNyDrikkeModal] = useState(false);
    const [oppdaterDrikkeModal, setOppdaterDrikkeModal] = useState(false);
    const [drikkeId, setDrikkeId] = useState(null);

    const toggleNyDrikke = () => {
        setNyDrikkeModal(!nyDrikkeModal);
    }

    const toggleOppdaterDrikke = (id) => {
        setDrikkeId(id);
        setOppdaterDrikkeModal(!oppdaterDrikkeModal);
    }

    const [feilmelding, setFeilmelding] = useState(false);
    const [vellykket, setVellykket] = useState(false);
    const [melding, setMelding] = useState("");

    return (
        <Layout>
            <Head>
                <title>Drikkeliste | Internsida</title>
            </Head>
            <Dialog maxWidth="xs" fullWidth onClose={toggleNyDrikke} open={nyDrikkeModal}>
                <NyDrikkeModal toggleNyDrikke={toggleNyDrikke} setFeilmelding={setFeilmelding} setVellykket={setVellykket} setMelding={setMelding} />
            </Dialog>
            <Dialog maxWidth="xs" fullWidth onClose={toggleOppdaterDrikke} open={oppdaterDrikkeModal}>
                <OppdaterDrikkeModal toggleOppdaterDrikke={toggleOppdaterDrikke} drikkeId={drikkeId} setFeilmelding={setFeilmelding} setVellykket={setVellykket} setMelding={setMelding} />
            </Dialog>
            <Grid container>
                <Grid item xs={10}>
                    <DrikkeListe toggleOppdaterDrikke={(id) => toggleOppdaterDrikke(id)} />
                </Grid>
                <Grid item xs={2}>
                    <Kontrollpanel toggleNyDrikke={toggleNyDrikke} />
                </Grid>
            </Grid>
            <Snackbar
                open={vellykket}
                autoHideDuration={6000}
                onClose={() => setVellykket(false)}
            >
                <Alert onClose={() => setVellykket(false)} severity="success">
                    {melding}
                </Alert>
            </Snackbar>
            <Snackbar
                open={feilmelding}
                autoHideDuration={6000}
                onClose={() => setFeilmelding(false)}
            >
                <Alert onClose={() => setFeilmelding(false)} severity="error">
                    {melding}
                </Alert>
            </Snackbar>
        </Layout>
    );
};

export default Drikke;
