import {
  GET_ALLE_ROM_TYPE,
  LOGG_UT_TYPE,
  GET_ALLE_STORHYBELLISTER_TYPE,
  GET_STORHYBELLISTE_TYPE,
  SLETT_STORHYBELLISTE_TYPE,
} from "../types";
import _ from "lodash";

const INITIAL_STATE = {
  rom: {},
  romtyper: {},
  storhybellister: {},
};

export default function rom(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    case GET_ALLE_ROM_TYPE:
      return {
        ...state,
        rom: _.mapKeys(action.payload, (r) => r.id),
      };
    case GET_ALLE_STORHYBELLISTER_TYPE:
      return {
        ...state,
        storhybellister: _.mapKeys(action.payload, (l) => l.id),
      };
    case GET_STORHYBELLISTE_TYPE:
      return {
        ...state,
        storhybellister: {
          ...state.storhybellister,
          [action.payload.id]: action.payload,
        },
      };
    case SLETT_STORHYBELLISTE_TYPE:
      return {
        ...state,
        storhybellister: _.omit(state.storhybellister, action.payload.id),
      };
    default:
      return state;
  }
}
