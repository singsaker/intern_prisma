module.exports = {
  alle: async (context) => {
    try {
      return await context.prisma.drikke.findMany({
        include: {
          drikke_kategori: true,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  aktive: async (context) => {
    try {
      const res = await context.prisma.drikke.findMany({
        where: {
          aktiv: true,
        },
        include: {
          drikke_kategori: true,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  unik: async (id, context) => {
    try {
      const res = await context.prisma.drikke.findUnique({
        where: {
          id: id,
        },
        include: {
          drikke_kategori: true,
        },
      });
      return res;
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
        include: {
          drikke_kategori: true,
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
        include: {
          drikke_kategori: true,
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
        include: {
          drikke_kategori: true,
        },
      });
      return drikke;
    } catch (err) {
      throw err;
    }
  },
};
