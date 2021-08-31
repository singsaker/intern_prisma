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

const kryssMutation = {
  migrerKrysseliste: async (parent, args, context) => {
    try {
      const krysselister = await context.prisma.krysseliste.findMany();
      let nyeKryss = [];

      const drikke = await context.prisma.drikke.findMany({
        select: {
          id: true,
        },
      });

      for (x in krysselister) {
        const liste = krysselister[x];
        const drikkeKryss = JSON.parse(liste.krysseliste);

        for (y in drikkeKryss) {
          nyeKryss.push({
            beboer: { connect: { id: liste.beboer_id } },
            drikke: { connect: { id: liste.drikke_id } },
            antall: Number(drikkeKryss[y].antall),
            tid: new Date(drikkeKryss[y].tid),
            fakturert: drikkeKryss[y].fakturert === 1 ? true : false,
          });
        }
      }

      for (z in nyeKryss) {
        await context.prisma.kryss.create({
          data: nyeKryss[z],
        });
      }

      // await context.prisma.kryss.createMany({
      //   data: nyeKryss,
      // });
      return null;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { kryssQuery, kryssMutation };
