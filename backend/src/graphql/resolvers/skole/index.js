const { isString } = require("lodash");
const formaterBeboer = require("../beboer/formaterBeboer");
const DB = require("../../database");

const skoleQuery = {
  hentSkole: async (parent, args, context) => {
    try {
      return DB.skole.alle(context);
    } catch (err) {
      throw err;
    }
  },
  hentStudie: async (parent, args, context) => {
    try {
      return DB.studie.alle(context);
    } catch (err) {
      throw err;
    }
  },
};

const skoleMutation = {
  lagStudie: async (parent, args, context) => {
    try {
      return DB.studie.lag(args.navn, context);
    } catch (err) {
      throw err;
    }
  },
  oppdaterStudie: async (parent, args, context) => {
    try {
      return DB.studie.oppdater(args.id, args.navn, context);
    } catch (err) {
      throw err;
    }
  },
  slettStudie: async (parent, args, context) => {
    try {
      DB.beboer.slettStudie(args.id, context);
      return DB.studie.slett(args.id, context);
    } catch (err) {
      throw err;
    }
  },
  lagSkole: async (parent, args, context) => {
    try {
      const res = DB.skole.lag(args.navn, context);

      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdaterSkole: async (parent, args, context) => {
    try {
      return DB.skole.oppdater(args.id, args.navn, context);
    } catch (err) {
      throw err;
    }
  },
  slettSkole: async (parent, args, context) => {
    try {
      DB.beboer.slettSkole(args.id, context);
      return DB.skole.slett(args.id, context);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { skoleQuery, skoleMutation };
