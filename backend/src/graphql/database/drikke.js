const drikke = {
  alle: async (context) => {
    try {
      return await context.prisma.drikke.findMany();
    } catch (err) {
      throw err;
    }
  },
  lag: async (args, context) => {
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
      return err;
    }
  },
  oppdater: async (args, context) => {
    try {
      const drikke = await context.prisma.drikke.update({
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

      return drikke;
    } catch (err) {
      throw err;
    }
  },
  slett: async (args, context) => {
    try {
      const drikke = await context.prisma.drikke.delete({
        where: {
          id: args.id,
        },
      });
      return drikke;
    } catch (err) {
      throw err;
    }
  },
};
module.exports = { drikke };
