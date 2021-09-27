/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getArbeidskategorier } from "../../src/actions/regi";
import { GET_ARBEIDSKATEGORIER } from "../../src/query/regi";

// Misc
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/react-hooks";

// Components
import Spinner from "../CustomSpinner";
import { Button } from "@material-ui/core";

const Registrer = () => {
  const dispatch = useDispatch();
  const kategorier = useSelector((state) => Object.values(state.regi.arbeidskategorier));
  const [tilhorighet, setTilhorighet] = useState("genarb");
  const [kategori, setKategori] = useState("loading");
  const [utfort, setUtfort] = useState(new Date());
  const [tidBrukt, setTidbrukt] = useState("");
  const [beskrivelse, setBeskrivelse] = useState("");

  const { loading } = useQuery(GET_ARBEIDSKATEGORIER, {
    onCompleted(data) {
      dispatch(getArbeidskategorier(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  if (loading) return <Spinner />;
  const submitButton = (
    <Button style={{ float: "right" }} type="submit">
      Registrer
    </Button>
  );

  return (
    <>
      {/* <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Card header="Registrer regi" footer={submitButton}>
        <Form.Group className="py-1" as={Row}>
          <Form.Label column sm="3">
            Tilhørighet
          </Form.Label>
          <Col sm="9">
            <Form.Control as="select" onChange={(event) => setTilhorighet(event.target.value)} value={tilhorighet}>
              <option value="genarb">Generelt arbeid</option>
              <option value="genfei">Generell feil</option>
              <option value="spefei">Spesifikk feil</option>
              <option value="speopg">Spesifikk oppgave</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="py-1" as={Row}>
          <Form.Label column sm="3">
            Kategori
          </Form.Label>
          <Col sm="9">
            <Form.Control as="select" onChange={(event) => setKategori(event.target.value)} value={kategori}>
              {kategorier.length !== null &&
                kategorier.map((kategori) => {
                  return (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.navn}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group className="py-1" as={Row}>
          <Form.Label column sm="3">
            Dato utført
          </Form.Label>
          <Col sm="9">
            <DatePicker dateFormat="dd.MM.yyyy" selected={utfort} isClearable onChange={(date) => setUtfort(date)} />
          </Col>
        </Form.Group>
        <Form.Group className="py-1" as={Row}>
          <Form.Label column sm="3">
            Tid brukt
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="0:00"
              onChange={(event) => setTidbrukt(event.target.value)}
              value={tidBrukt}
            />
          </Col>
        </Form.Group>
        <Form.Group className="py-1" as={Row}>
          <Form.Label column sm="3">
            Beskrivelse
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(event) => setBeskrivelse(event.target.value)}
              value={beskrivelse}
            />
          </Col>
        </Form.Group>
        <Form.Group className="py-1" as={Row}>
          <Form.Label column sm="3">
            Bilder
          </Form.Label>
          <Col sm="9">
            <Form.File />
          </Col>
        </Form.Group>
      </Card>
    </Form> */}
    </>
  );
};

export default Registrer;
