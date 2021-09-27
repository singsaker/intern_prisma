import { GET_DRIKKER_TYPE, GET_DRIKKE_TYPE } from "../types";

export const getDrikker = (data) => {
  return {
    type: GET_DRIKKER_TYPE,
    payload: data.hentDrikke,
  };
};

export const lagDrikke = (data) => {
  return {
    type: GET_DRIKKE_TYPE,
    payload: data.lagDrikke,
  };
};

export const oppdaterDrikke = (data) => {
  return {
    type: GET_DRIKKE_TYPE,
    payload: data.oppdaterDrikke,
  };
};
