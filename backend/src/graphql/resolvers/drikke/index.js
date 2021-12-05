const DB = require("../../database");

const drikkeQuery = {
  hentDrikke: async (parent, args, context) => {
    try {
      return DB.drikke.alle(context);
    } catch (err) {
      throw err;
    }
  },
};

const drikkeMutation = {
  lagDrikke: async (parent, args, context) => {
    try {
      if (args.pris <= 0) {
        return new Error("Prisen må være mer enn 0,-");
      } else if (args.navn.length <= 256) {
        return new Error("Lengden på navnet må være max 256 karakterer.");
      } else {
        return DB.drikke.lag(args, context);
      }
    } catch (err) {
      throw err;
    }
  },
  oppdaterDrikke: async (parent, args, context) => {
    try {
      if (args.pris <= 0) {
        return new Error("Prisen må være mer enn 0,-");
      } else if (args.navn.length <= 256) {
        return new Error("Lengden på navnet må være max 256 karakterer.");
      } else {
        return Error("Ikke et gyldig navn!");
      }
    } catch (err) {
      throw err;
    }
  },
  slettDrikke: async (parent, args, context) => {
    try {
      return await DB.drikke.slett(args, context);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { drikkeQuery, drikkeMutation };
