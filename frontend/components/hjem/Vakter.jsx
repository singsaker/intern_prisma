import React, { useEffect } from "react";

import Card from "react-bootstrap/Card";
import { useQuery } from "@apollo/react-hooks";
import { GET_VAKTER } from "../../src/query/vakt";
import { useDispatch, useSelector } from "react-redux";
import { getVakter } from "../../src/actions/vakt";
import CustomSpinner from "../CustomSpinner";
import { Container, Table } from "react-bootstrap";
import styles from "../../styles/Table.module.css";

const Vakter = () => {
  const dispatch = useDispatch();
  const vakter = useSelector((state) => Object.values(state.vakt.vakter));
  const bruker_id = useSelector((state) => state.auth.bruker_id);

  const { loading } = useQuery(GET_VAKTER, {
    variables: {
      fraDato: "2018-11-12T14:44:59.517Z",
      tilDato: "2020-11-12T14:44:59.517Z",
      bruker_id: bruker_id,
    },
    onCompleted(data) {
      dispatch(getVakter(data));
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <Card bg="dark" text="white">
      <Card.Header>
        <h2>Vakter fremover</h2>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <div className={styles.container}>
          {loading ? (
            <CustomSpinner />
          ) : vakter.length > 0 ? (
            <Table className={styles.table}>
              <tbody>
                {vakter.map((vakt) => {
                  return (
                    <tr key={vakt.id}>
                      <td>
                        <p
                          style={{
                            color: "#2E83F2",
                            margin: 0,
                            fontSize: "0.9rem",
                          }}
                        >
                          {vakt.dato}
                        </p>
                        <h3 style={{ padding: 0, margin: 0 }}>
                          {vakt.vakttype}. Vakt
                        </h3>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Container>Du er ikke satt opp på noen flere vakter</Container>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Vakter;
