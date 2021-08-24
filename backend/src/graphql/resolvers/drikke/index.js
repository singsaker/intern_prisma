const { isString } = require("lodash");

const drikkeQuery = {
  hentDrikke: async (parent, args, context) => {
    try {
      return await context.prisma.drikke.findMany();
    } catch (err) {
      throw err;
    }
  },
};

const drikkeMutation = {
  lagDrikke: async (parent, args, context) => {
    try {
      const res = await context.prisma.drikke.create({
        data: {
          navn: args.navn,
          pris: args.pris,
          aktiv: args.aktiv,
          farge: args.farge,
          vin: args.vin,
          kommentar: args.kommentar,
          forst: args.forst,
          produktnr: args.produktnr,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdaterDrikke: async (parent, args, context) => {
    try {
      if (args.navn.length > 0 && isString(args.navn)) {
        return await context.prisma.drikke.update({
          where: {
            id: args.id,
          },
          data: {
            navn: args.navn,
            pris: args.pris,
            aktiv: args.aktiv,
            vin: args.vin,
            farge: args.farge,
            kommentar: args.kommentar,
            forst: args.forst,
            produktnr: args.produktnr,
          },
        });
      } else {
        return Error("Ikke et gyldig navn!");
      }
    } catch (err) {
      throw err;
    }
  },
  slettDrikke: async (parent, args, context) => {
    try {
      return await context.prisma.drikke.delete({
        where: {
          id: args.id,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { drikkeQuery, drikkeMutation };
