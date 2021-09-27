import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import CustomSpinner from "../CustomSpinner";

// Misc
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
    <>
      <h2>Historikk</h2>
      <div>
        <table>
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
        </table>
      </div>
    </>
  );
};

export default Kryssehistorikk;
