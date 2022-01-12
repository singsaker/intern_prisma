import { GET_ALLE_ROM_TYPE } from "../types";

export const getAlleRom = (data) => {
  return {
    type: GET_ALLE_ROM_TYPE,
    payload: data.hentAlleRom,
  };
};
