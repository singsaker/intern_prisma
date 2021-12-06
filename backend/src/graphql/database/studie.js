module.exports = {
  alle: async (context) => {
    try {
      const res = await context.prisma.studie.findMany();

      return res;
    } catch (err) {
      throw err;
    }
  },
  lag: async (navn, context) => {
    try {
      const res = await context.prisma.studie.create({
        data: {
          navn: navn,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  slett: async (id, context) => {
    try {
      const res = await context.prisma.studie.delete({
        where: {
          id: id,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdater: async (id, navn, context) => {
    try {
      const res = await context.prisma.studie.update({
        where: {
          id: id,
        },
        data: {
          navn: navn,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
};
