import {
  GET_SKOLE_TYPE,
  GET_STUDIER_TYPE,
  GET_STUDIE_TYPE,
  LOGG_UT_TYPE,
  SLETT_STUDIE_TYPE,
} from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  skoler: {},
  studier: {},
};

export default function skole(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_STUDIER_TYPE:
      return {
        ...state,
        studier: _.mapKeys(action.payload, (studie) => {
          return studie.id;
        }),
      };
    case GET_STUDIE_TYPE:
      return {
        ...state,
        studier: {
          ...state.studier,
          [action.payload.id]: action.payload,
        },
      };
    case SLETT_STUDIE_TYPE:
      return {
        ...state,
        studier: _.omit(state.studier, action.payload.id),
      };
    case GET_SKOLE_TYPE:
      return {
        ...state,
        skoler: _.mapKeys(action.payload, (skole) => {
          return skole.id;
        }),
      };
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
