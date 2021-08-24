import {
  GET_STUDIE_TYPE,
  SLETT_STUDIE_TYPE,
  GET_STUDIER_TYPE,
  GET_SKOLE_TYPE,
} from "../types";

export const oppdaterStudie = (data) => {
  return {
    type: GET_STUDIE_TYPE,
    payload: data.oppdaterStudie,
  };
};

export const lagStudie = (data) => {
  return {
    type: GET_STUDIE_TYPE,
    payload: data.lagStudie,
  };
};

export const slettStudie = (data) => {
  return {
    type: SLETT_STUDIE_TYPE,
    payload: data.slettStudie,
  };
};

export const getStudier = (data) => {
  return {
    type: GET_STUDIER_TYPE,
    payload: data.hentStudie,
  };
};

export const getSkole = (data) => {
  return {
    type: GET_SKOLE_TYPE,
    payload: data.hentSkole,
  };
};
