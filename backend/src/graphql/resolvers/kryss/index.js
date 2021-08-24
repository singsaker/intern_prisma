const kryssQuery = {
  hentAktivVin: async (parent, args, context) => {
    try {
      const vin = await context.prisma.vin.findMany({
        where: {
          slettet: 0,
        },
        include: {
          vintype: true,
        },
      });

      return vin.map((flaske) => {
        return { ...flaske, type: flaske.vintype.navn };
      });
    } catch (err) {
      throw err;
    }
  },
  hentAktivDrikke: async (parent, args, context) => {
    try {
      return await context.prisma.drikke.findMany({
        where: {
          aktiv: true,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  hentFakturert: async (parent, args, context) => {
    try {
      const filter = args.fra_dato && { dato: { gte: args.fra_dato } };

      const res = await context.prisma.fakturert.findMany({
        where: filter,
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  hentKrysseliste: async (parent, args, context) => {
    try {
      const krysseListe = await context.prisma.krysseliste.findMany({
        where: {
          beboer_id: args.beboerId,
        },
        include: {
          drikke: true,
        },
      });

      return krysseListe.map((liste) => {
        return {
          ...liste,
          krysseliste: JSON.parse(liste.krysseliste),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { kryssQuery };
