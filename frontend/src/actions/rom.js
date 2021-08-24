import {
  GET_ALLE_ROM_TYPE,
  GET_ALLE_STORHYBELLISTER_TYPE,
  GET_STORHYBELLISTE_TYPE,
  SLETT_STORHYBELLISTE_TYPE,
} from "../types";

export const getAlleRom = (data) => {
  return {
    type: GET_ALLE_ROM_TYPE,
    payload: data.hentAlleRom,
  };
};

export const getAlleStorhybellister = (data) => {
  return {
    type: GET_ALLE_STORHYBELLISTER_TYPE,
    payload: data.hentStorhybellister,
  };
};

export const lagStorhybelliste = (data) => {
  return {
    type: GET_STORHYBELLISTE_TYPE,
    payload: data.lagStorhybelliste,
  };
};

export const slettStorhybelliste = (data) => {
  return {
    type: SLETT_STORHYBELLISTE_TYPE,
    payload: data.slettStorhybelliste,
  };
};
