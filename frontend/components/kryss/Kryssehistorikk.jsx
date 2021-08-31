import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import CustomSpinner from "../CustomSpinner";

// Bootstrap
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

// Misc
import styles from "../../styles/Table.module.css";
import formaterDatoOgKlokke from "../../helpers/formaterDatoOgKlokke";

const Kryssehistorikk = () => {
  const krysseliste = useSelector((state) => Object.values(state.kryss.krysseliste));
  const [kryss, setKryss] = useState([]);

  useEffect(() => {
    if (krysseliste.length > 0 && kryss.length < 1) {
      let tmpKryss = [];
      krysseliste.forEach((drikketype) => {
        const navn = drikketype.drikke.navn;
        drikketype.krysseliste.forEach((k) => {
          tmpKryss.push({
            navn: navn,
            tid: k.tid,
            antall: k.antall,
          });
        });
      });

      tmpKryss.sort((a, b) => {
        return new Date(b.tid) - new Date(a.tid);
      });
      setKryss(tmpKryss);
    }
  }, [krysseliste]);

  if (kryss.length < 1) return <CustomSpinner />;

  return (
    <Card bg="dark" text="white">
      <Card.Header>
        <h2>Historikk</h2>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <div className={styles.container}>
          <Table className={styles.table} responsive>
            <thead>
              <tr>
                <td>Dato</td>
                <td>Klokkeslett</td>
                <td>Antall</td>
                <td>Drikke</td>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "40vh" }}>
              {kryss.map((kryss) => {
                const tid = formaterDatoOgKlokke(kryss.tid);
                return (
                  <tr key={kryss.tid}>
                    <td>{tid.dato}</td>
                    <td>{tid.klokkeslett}</td>
                    <td>{kryss.antall}</td>
                    <td>{kryss.navn}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Kryssehistorikk;
