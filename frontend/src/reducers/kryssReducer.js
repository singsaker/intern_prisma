import {
  GET_KRYSSELISTE_TYPE,
  GET_AKTIV_VIN_TYPE,
  GET_AKTIV_DRIKKE_TYPE,
  LOGG_UT_TYPE,
  GET_KRYSS_TYPE,
} from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  krysseliste: {},
  aktivVin: {},
  aktivDrikke: {},
};

export default function kryss(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_KRYSS_TYPE:
      return {
        ...state,
        kryss: _.mapKeys(action.payload, (kryss) => {
          return kryss.id;
        }),
      };
    case GET_KRYSSELISTE_TYPE:
      return {
        ...state,
        krysseliste: _.mapKeys(action.payload, (krysseliste) => {
          return krysseliste.id;
        }),
      };
    case GET_AKTIV_VIN_TYPE:
      return {
        ...state,
        aktivVin: _.mapKeys(action.payload, (vin) => {
          return vin.id;
        }),
      };
    case GET_AKTIV_DRIKKE_TYPE:
      const hentetDrikke = _.mapKeys(action.payload, (drikke) => {
        return drikke.id;
      });

      return {
        ...state,
        aktivDrikke: {
          ...state.drikke,
          ...hentetDrikke,
        },
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
