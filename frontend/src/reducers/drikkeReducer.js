import {
  GET_DRIKKER_TYPE,
  GET_DRIKKE_TYPE,
  GET_KRYSSELISTE_TYPE,
  GET_AKTIV_DRIKKE_TYPE,
  LOGG_UT_TYPE,
} from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  drikke: {},
  vin: {},
};

export default function drikke(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DRIKKER_TYPE:
      const drikker = _.mapKeys(action.payload, (drikke) => {
        return drikke.id;
      })

      return {
        ...state,
        drikke: drikker
      }

    case GET_KRYSSELISTE_TYPE:
      const drikke = action.payload.map((obj) => {
        return obj.drikke;
      });

      const nyDrikke = _.mapKeys(drikke, (obj) => {
        return obj.id;
      });

      return {
        ...state,
        drikke: nyDrikke,
      };
    case GET_AKTIV_DRIKKE_TYPE:
      const hentetDrikke = _.mapKeys(action.payload, (drikke) => {
        return drikke.id;
      });

      return {
        ...state,
        drikke: {
          ...state.drikke,
          ...hentetDrikke,
        },
      };
    case GET_DRIKKE_TYPE:
      return {
        ...state,
        drikke: {
          ...state.drikke, [action.payload.id]: action.payload
        }
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
