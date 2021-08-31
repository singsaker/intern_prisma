import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getArbeid } from "../../src/actions/regi";
import { getBeboer } from "../../src/actions/beboer";
import { GET_ARBEID } from "../../src/query/regi";
import { GET_BEBOER } from "../../src/query/beboer";

// Bootstrap
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Components
import Spinner from "../CustomSpinner";

// Misc
import { isInteger, isString } from "lodash";
import styles from "../../styles/Table.module.css";
import { useLazyQuery } from "@apollo/react-hooks";
import sekunderTilTid from "../../helpers/sekunderTilTid";

const MinRegi = (props) => {
  const dispatch = useDispatch();
  const date = new Date();
  const arbeid = useSelector((state) => Object.values(state.regi.arbeid));
  const bruker_id = useSelector((state) => state.auth.bruker_id);
  const beboer_id = useSelector((state) => state.auth.beboer_id);
  const beboer = useSelector((state) => state.beboer.beboere[beboer_id]);
  const [semester, setSemester] = useState("");
  const [innflyttet, setInnflyttet] = useState(null);
  const [semestere, setSemestere] = useState([]);

  const [hentArbeid, { loading }] = useLazyQuery(GET_ARBEID, {
    onCompleted(data) {
      dispatch(getArbeid(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  const [hentBeboer] = useLazyQuery(GET_BEBOER, {
    onCompleted(data) {
      dispatch(getBeboer(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isInteger(bruker_id)) {
      hentArbeid({
        variables: {
          brukerId: bruker_id,
        },
      });
    }

    if (isInteger(beboer_id)) {
      hentBeboer({
        variables: {
          id: beboer_id,
        },
      });
    }
  }, [bruker_id, beboer_id]);

  useEffect(() => {
    props.setSemester(semester);

    if (isString(semester) && semester.length > 0) {
      const ses = semester.split(".")[0];
      const aar = semester.split(".")[1];
      hentArbeid({
        variables: {
          brukerId: bruker_id,
          semester: ses,
          aar: Number(aar),
        },
      });
    }
  }, [semester]);

  useEffect(() => {
    if (beboer) {
      setInnflyttet(new Date(beboer.innflyttet));
    }
  }, [beboer]);

  // Lager en liste med alle semestere fra beboeren først flyttet inn til nå:
  useEffect(() => {
    if (innflyttet !== null) {
      if (date.getMonth() < 5) {
        setSemester("vaar." + date.getFullYear());
      } else {
        setSemester("host." + date.getFullYear());
      }

      if (semestere.length < date.getFullYear() - innflyttet.getFullYear()) {
        for (let i = innflyttet.getFullYear(); i <= date.getFullYear(); i++) {
          if (i == innflyttet.getFullYear() && innflyttet.getMonth() > 5) {
            setSemestere((oldArray) => [...oldArray, { ses: "host", aar: i }]);
          } else if (i == date.getFullYear() && date.getMonth() < 6) {
            setSemestere((oldArray) => [...oldArray, { ses: "vaar", aar: i }]);
          } else {
            setSemestere((oldArray) => [...oldArray, { ses: "vaar", aar: i }]);
            setSemestere((oldArray) => [...oldArray, { ses: "host", aar: i }]);
          }
        }
      }
    }
  }, [innflyttet]);

  if (loading || !beboer) return <Spinner />;

  return (
    <Card bg="dark" text="white">
      <Card.Header>
        <h2>Utført regi</h2>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column>Semester</Form.Label>
            <Col sm={8}>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setSemester(e.target.value);
                }}
                value={semester}
              >
                {semestere.map((s) => {
                  const sesong = s.ses == "vaar" ? "vaar." : "host.";

                  return (
                    <option key={sesong + String(s.aar)} value={sesong + String(s.aar)}>
                      {s.ses == "vaar" ? "Vår " : "Høst "}
                      {s.aar}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Card.Header>
      <div className={styles.container} style={{ maxHeight: "600px", height: "auto" }}>
        <Table className={styles.table} responsive size="sm">
          <thead>
            <tr>
              <th scope="col" className="col-3">
                Utført
              </th>
              <th scope="col" className="col-2">
                Registrert
              </th>
              <th scope="col" className="col-1">
                Tid brukt
              </th>
              <th scope="col" className="col-3">
                Kommentar
              </th>
              <th scope="col" className="col-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody
            style={{
              overflowY: "scroll",
            }}
          >
            {arbeid.map((arb) => {
              if (arb.bruker.id !== bruker_id) return;
              const utfort = new Date(arb.tid_utfort);
              const arbSem = utfort.getMonth() < 6 ? "vaar" : "host";

              // Filtrerer ut arbeid som ikke er gjort under valgt semester:
              if (Number(semester.split(".")[1]) !== utfort.getFullYear() || arbSem !== semester.split(".")[0]) return;

              const { hours, minutes } = sekunderTilTid(arb.sekunder_brukt);
              return (
                <tr key={arb.id}>
                  <td className="col-3">{utfort.toUTCString()}</td>
                  <td className="col-1">{new Date(arb.tid_registrert).toUTCString()}</td>

                  <td className="col-2">{hours + ":" + minutes}</td>
                  <td className="col-3" style={{ overflow: "hidden" }}>
                    {arb.kommentar}
                  </td>
                  <td className="col-1" style={{ overflow: "hidden" }}>
                    {arb.godkjent ? "Godkjent" : "Ubehandlet"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default MinRegi;
