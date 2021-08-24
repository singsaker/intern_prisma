import {
  GET_ARBEIDSKATEGORIER_TYPE,
  GET_ARBEID_TYPE,
  GET_REGISTATUS_TYPE,
  GET_ROLLER_TYPE,
  LOGG_UT_TYPE,
} from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  arbeidskategorier: {},
  arbeid: {},
  regiStatus: {},
  roller: {},
};

export default function regi(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ARBEIDSKATEGORIER_TYPE:
      return {
        ...state,
        arbeidskategorier: _.mapKeys(action.payload, (kategori) => {
          return kategori.id;
        }),
      };
    case GET_ARBEID_TYPE:
      return {
        ...state,
        arbeid: {
          ...state.arbeid,
          ..._.mapKeys(action.payload, (arb) => {
            return arb.id;
          }),
        },
      };
    case GET_REGISTATUS_TYPE:
      return {
        ...state,
        regiStatus: {
          ...state.regiStatus,
          [action.payload.semester]: action.payload,
        },
      };
    case GET_ROLLER_TYPE:
      return {
        ...state,
        roller: _.mapKeys(action.payload, (rolle) => {
          return rolle.id;
        }),
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
