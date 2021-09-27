import { GET_BEBOER } from "../query/beboer";
import {
  GET_BEBOERE_TYPE,
  GET_BEBOER_TYPE,
  GET_VERV_TYPE,
  GET_GAMLE_BEBOERE_TYPE,
  GET_GAMMEL_BEBOER_TYPE,
  GET_BEBOER_PREFS_TYPE,
  GET_BEBOER_EPOST_PREFS_TYPE,
  GET_NOEN_BEBOERE_TYPE,
  SLETT_BEBOER_TYPE,
  SEND_PAA_PERM_TYPE,
  SEND_HJEM_FRA_PERM_TYPE,
  GET_PERMLISTE_TYPE,
} from "../types";

export const getBeboerPrefs = (data) => {
  return {
    type: GET_BEBOER_PREFS_TYPE,
    payload: data.hentPrefs,
  };
};

export const getBeboerEpostPrefs = (data) => {
  return {
    type: GET_BEBOER_EPOST_PREFS_TYPE,
    payload: data.hentEpostPrefs,
  };
};

export const oppdaterBeboerAdmin = (data) => {
  return {
    type: GET_BEBOER_TYPE,
    payload: data.oppdaterBeboerAdmin,
  };
};

export const flyttBeboer = (data) => {
  return {
    type: GET_BEBOER_TYPE,
    payload: data.flyttBeboer,
  };
};

export const oppdaterBeboerEpostPrefs = (args) => {
  return {
    type: GET_BEBOER_EPOST_PREFS_TYPE,
    payload: args.oppdaterEpostPrefs,
  };
};

export const oppdaterBeboerPrefs = (args) => {
  return {
    type: GET_BEBOER_PREFS_TYPE,
    payload: args.oppdaterPrefs,
  };
};

export const oppdaterBeboer = (data) => {
  return {
    type: GET_BEBOER_TYPE,
    payload: data.oppdaterBeboer,
  };
};

export const oppdaterGammelBeboer = (data) => {
  return {
    type: GET_GAMMEL_BEBOER_TYPE,
    payload: data.oppdaterBeboer,
  };
};

export const getBeboere = (data) => {
  return {
    type: GET_BEBOERE_TYPE,
    payload: data.hentBeboere,
  };
};

export const getBeboer = (data) => {
  return {
    type: GET_BEBOER_TYPE,
    payload: data.hentBeboer,
  };
};

export const getBeboerKryss = (data) => {
  return {
    type: GET_BEBOER_TYPE,
    payload: data.hentBeboerKryss,
  };
};

export const getVerv = (data) => {
  return {
    type: GET_VERV_TYPE,
    payload: data.hentVerv,
  };
};

export const getGamleBeboere = (data) => {
  return {
    type: GET_GAMLE_BEBOERE_TYPE,
    payload: data.hentGamleBeboere,
  };
};

export const oppdaterAnsiennitet = (data) => {
  return {
    type: GET_NOEN_BEBOERE_TYPE,
    payload: data.oppdaterAnsiennitet,
  };
};

export const lagBeboer = (data) => {
  return {
    type: GET_BEBOER_TYPE,
    payload: data.lagBeboer,
  };
};

export const slettBeboer = (data) => {
  return {
    type: SLETT_BEBOER_TYPE,
    payload: data.slettBeboer,
  };
};

export const sendPaaPerm = (data) => {
  return {
    type: SEND_PAA_PERM_TYPE,
    payload: data.oppdaterPermStatus,
  };
};

export const sendHjemFraPerm = (data) => {
  return {
    type: SEND_HJEM_FRA_PERM_TYPE,
    payload: data.oppdaterPermStatus,
  };
};

export const getPermliste = (data) => {
  return {
    type: GET_PERMLISTE_TYPE,
    payload: data.hentBeboerePerm,
  };
};
