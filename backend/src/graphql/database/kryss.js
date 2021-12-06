module.exports = {
  alle: async (context) => {
    try {
      const res = await context.prisma.kryss.findMany({
        include: {
          beboer: true,
          drikke: true,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  siste: async (ant, context) => {
    try {
      const res = await context.prisma.kryss.findMany({
        take: -ant,
        include: {
          beboer: true,
          drikke: true,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  beboer: async (bebeor_id, context) => {
    try {
      const res = await context.prisma.kryss.findMany({
        where: {
          beboer_id: beboer_id,
        },
        inlcude: {
          drikke: true,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  lag: async (beboer_id, drikke_id, antall, context) => {
    try {
      const res = await context.prisma.kryss.create({
        data: {
          beboer: {
            connect: {
              id: beboer_id,
            },
          },
          drikke: {
            connect: {
              id: drikke_id,
            },
          },
          antall: antall,
        },
        include: {
          beboer: true,
          drikke: true,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  slett: async (id, context) => {
    try {
      const res = await context.prisma.kryss.delete({
        where: {
          id: id,
        },
        include: {
          beboer: true,
          drikke: true,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
};
