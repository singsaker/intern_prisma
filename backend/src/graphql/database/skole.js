const { argsToArgsConfig } = require("graphql/type/definition");

module.exports = {
  alle: async (context) => {
    try {
      const res = await context.prisma.skole.findMany();
      return res;
    } catch (err) {
      throw err;
    }
  },
  lag: async (navn, context) => {
    try {
      const res = await context.prisma.skole.create({
        data: {
          navn: navn,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdater: async (id, navn, context) => {
    try {
      const res = await context.prisma.skole.update({
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
  slett: async (id, context) => {
    try {
      const res = await context.prisma.skole.delete({
        where: {
          id: args.id,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
};
