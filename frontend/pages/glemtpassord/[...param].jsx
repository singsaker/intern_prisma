/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// Apollo
import { useMutation } from "@apollo/react-hooks";

// Redux
import { RESETT_GLEMT_PASSORD } from "../../src/query/auth";

// Next
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

// Misc
import styles from "../../styles/Login.module.css";

const Login = () => {
  const router = useRouter();
  const [passord1, setPassord1] = useState("");
  const [passord2, setPassord2] = useState("");
  const params = router.query.param;

  const [resettPassord, { loading }] = useMutation(RESETT_GLEMT_PASSORD, {
    variables: {
      brukerId: Number(params[0]),
      token: params[1],
      passord: passord1,
    },
  });

  const handleResett = () => {
    if (passord1 === passord2) {
      if (!(passord1.length < 8)) {
        resettPassord();
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* <Head>
        <title>Resett passord | Internsida</title>
      </Head>

      <Container>
        <Row className={styles.row}>
          <Col className={styles.col} xs={10} md={6}>
            <h2>Resett passord</h2>

            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleResett();
              }}
              noValidate
              className="needs-validation"
            >
              <FormGroup>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Passord"
                  value={passord1}
                  required
                  onChange={(event) => setPassord1(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Passord"
                  value={passord2}
                  required
                  onChange={(event) => setPassord2(event.target.value)}
                />
              </FormGroup>
              <Button size="lg" type="submit" block>
                {loading ? "Sender forespørsel..." : "Resett passord"}
              </Button>
              <Link href="/login">
                <a>Logg inn...</a>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default Login;
