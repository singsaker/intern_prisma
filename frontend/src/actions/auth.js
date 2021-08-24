import { LOGG_INN_TYPE, LOGG_UT_TYPE } from "../types";

export const loggUt = {
  type: LOGG_UT_TYPE,
};

export const loggInn = (data) => {
  return {
    type: LOGG_INN_TYPE,
    payload: data,
  };
};
