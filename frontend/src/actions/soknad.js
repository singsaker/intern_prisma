import { GET_NOEN_SOKNADER_TYPE, GET_SOKNAD_TYPE } from "../types";

export const getSoknaderSemester = (data) => {
  return {
    type: GET_NOEN_SOKNADER_TYPE,
    payload: data.hentSoknaderSemester,
  };
};

export const getSoknad = (data) => {
  return {
    type: GET_SOKNAD_TYPE,
    payload: data.hentSoknad,
  };
};
