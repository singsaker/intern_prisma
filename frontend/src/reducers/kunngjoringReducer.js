import { GET_KUNNGJORINGER_TYPE, LOGG_UT_TYPE } from "../types";
import _, { conforms } from "lodash";

const INITIAL_STATE = {};

export default function kunngjoring(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_KUNNGJORINGER_TYPE:
      return _.mapKeys(action.payload, (kunngjoring) => {
        return kunngjoring.id;
      });

    case LOGG_UT_TYPE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
