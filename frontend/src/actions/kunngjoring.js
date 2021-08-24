import { GET_KUNNGJORINGER_TYPE } from "../types";

export const getKunngjoringer = (data) => {
  return {
    type: GET_KUNNGJORINGER_TYPE,
    payload: data.hentKunngjoringer,
  };
};
