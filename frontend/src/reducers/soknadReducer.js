import {
  LOGG_UT_TYPE,
  GET_NOEN_SOKNADER_TYPE,
  GET_SOKNAD_TYPE,
} from "../types";

import { isDate } from "lodash";

const INITIAL_STATE = {};

export default function soknad(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NOEN_SOKNADER_TYPE:
      let nySoknader = state;
      action.payload.forEach((sok) => {
        const innsendt = new Date(Number(sok.innsendt));
        const sesong = innsendt.getMonth() < 6 ? "vaar" : "host";
        const aar = isDate(innsendt) ? innsendt.getFullYear() : "A";
        nySoknader[String(aar) + sesong] = {
          ...nySoknader[aar + sesong],
          [sok.id]: sok,
        };
      });
      return { ...nySoknader };
    case GET_SOKNAD_TYPE:
      let nySok = state;
      const innsendt = new Date(Number(action.payload.innsendt));
      const sesong = innsendt.getMonth() < 6 ? "vaar" : "host";
      const aar = isDate(innsendt) ? innsendt.getFullYear() : "A";
      nySok[String(aar) + sesong] = {
        ...nySok[aar + sesong],
        [action.payload.id]: action.payload,
      };
      return { ...nySok };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
