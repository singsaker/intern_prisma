import {
  GET_ARBEIDSKATEGORIER_TYPE,
  GET_ARBEID_TYPE,
  GET_REGISTATUS_TYPE,
  GET_ROLLER_TYPE,
} from "../types";

export const getArbeidskategorier = (data) => {
  return {
    type: GET_ARBEIDSKATEGORIER_TYPE,
    payload: data.hentArbeidskategorier,
  };
};

export const getArbeid = (data) => {
  return {
    type: GET_ARBEID_TYPE,
    payload: data.hentArbeid,
  };
};

export const getRegiStatus = (data) => {
  return {
    type: GET_REGISTATUS_TYPE,
    payload: data.hentRegiStatus,
  };
};

export const getRoller = (data) => {
  return {
    type: GET_ROLLER_TYPE,
    payload: data.hentRoller,
  };
};
