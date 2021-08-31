import React, { useState } from "react";

// Apollo
import { useLazyQuery } from "@apollo/react-hooks";

// Redux
import { GLEMT_PASSORD } from "../../src/query/auth";

// Next
import { useRouter } from "next/router";
import Head from "next/head";

// Material-UI
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/core/Alert";

const Login = () => {
  const router = useRouter();
  const [epost, setEpost] = useState("");
  const [sendt, setSendt] = useState(false);

  const [sendResettLink, { loading }] = useLazyQuery(GLEMT_PASSORD, {
    variables: {
      epost: epost,
    },
    onCompleted() {
      setSendt(true);
    },
    onError() {
      setSendt(true);
    },
  });

  return (
    <div>
      <Head>
        <title>Glemt passord | Internsida</title>
      </Head>

      <Grid container justify="center">
        <Paper variant="outlined" style={{ height: "300px", marginTop: "10%" }}>
          <Grid container justify="center" style={{ margin: "3% 0" }}>
            <Typography variant="h4" color="primary">
              Glemt passord
            </Typography>
          </Grid>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendResettLink();
            }}
          >
            <Grid container justify="center" xs={12}>
              <Grid item xs={10} style={{ margin: 8 }}>
                <FormControl required variant="outlined" style={{ width: "100%" }}>
                  <InputLabel htmlFor="component-outlined">Epost</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={epost}
                    onChange={(e) => setEpost(e.target.value)}
                    label="Epost"
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/login")}
                >
                  Tilbake
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" size="large" variant="contained" color="primary">
                  Send epost
                  {loading && <CircularProgress size={24} />}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar open={sendt} autoHideDuration={6000} onClose={() => setSendt(false)}>
        <Alert onClose={() => setSendt(false)} severity="success">
          Dersom eposten tilhører nettsiden vil en epost være sendt!
        </Alert>
      </Snackbar>

      {/* <Container>
        <Row>
          <Col xs={10} md={6}>
            <h2>Glemt passord</h2>
            {sendt && <Alert variant="success">Sjekk innboksen din!</Alert>}
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                sendResettLink();
              }}
              noValidate
              className="needs-validation"
            >
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="eksempel@singsaker.no"
                  onChange={(e) => setEpost(e.target.value)}
                  disabled={sendt}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Button
                    size="lg"
                    block
                    variant="secondary"
                    onClick={() => router.push("/login")}
                  >
                    Tilbake
                  </Button>
                </Col>
                <Col>
                  <Button size="lg" type="submit" block disabled={sendt}>
                    {loading ? "Sender..." : "Send epost"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default Login;
