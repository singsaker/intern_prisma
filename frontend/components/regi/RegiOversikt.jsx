/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { isString } from "lodash";
import Card from "../CustomCard";
import { GET_REGISTATUS } from "../../src/query/regi";
import { getRegiStatus } from "../../src/actions/regi";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import sekunderTilTid from "../../helpers/sekunderTilTid";
import SpinnerComponent from "../CustomSpinner";

const RegiOversikt = (props) => {
  const dispatch = useDispatch();
  const semester = props.semester;
  const bruker_id = useSelector((state) => state.auth.bruker_id);
  const regiStatus = useSelector((state) => state.regi.regiStatus[semester]);

  const [hentRegiStatus] = useLazyQuery(GET_REGISTATUS, {
    onCompleted(data) {
      dispatch(getRegiStatus(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isString(semester) && semester.length > 0) {
      const ses = semester.split(".")[0];
      const aar = semester.split(".")[1];
      hentRegiStatus({
        variables: {
          brukerId: bruker_id,
          semester: ses,
          aar: Number(aar),
        },
      });
    }
  }, [semester]);

  if (!regiStatus) return <SpinnerComponent />;

  return (
    <>
      {/* <Container style={{ padding: 0 }}>
        <Row>
          <Col style={{ textAlign: "right", fontWeight: "bold" }} xs={8}>
            Godkjent
          </Col>
          <Col xs={4}>
            {sekunderTilTid(regiStatus.godkjent).hours + ":" + sekunderTilTid(regiStatus.godkjent).minutes}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "right", fontWeight: "bold" }} xs={8}>
            Til behandling
          </Col>
          <Col xs={4}>
            {sekunderTilTid(regiStatus.behandling).hours + ":" + sekunderTilTid(regiStatus.behandling).minutes}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "right", fontWeight: "bold" }} xs={8}>
            Underkjent
          </Col>
          <Col xs={4}>
            {sekunderTilTid(regiStatus.underkjent).hours + ":" + sekunderTilTid(regiStatus.underkjent).minutes}
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: "right", fontWeight: "bold" }} xs={8}>
            Timer igjen
          </Col>
          <Col xs={4}>
            {sekunderTilTid(regiStatus.gjenvaerende).hours + ":" + sekunderTilTid(regiStatus.gjenvaerende).minutes}
          </Col>
        </Row>

        <Row>
          <Col style={{ textAlign: "right", fontWeight: "bold" }} xs={8}>
            Totalt pliktige timer
          </Col>
          <Col xs={4}>{sekunderTilTid(regiStatus.totalt).hours + ":" + sekunderTilTid(regiStatus.totalt).minutes}</Col>
        </Row>
      </Container> */}
    </>
  );
};

export default RegiOversikt;
