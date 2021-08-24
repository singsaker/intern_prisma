import { GET_VAKTER_TYPE } from "../types";

export const getVakter = (data) => {
  return {
    type: GET_VAKTER_TYPE,
    payload: data.hentVakter,
  };
};
