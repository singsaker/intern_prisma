const soknadQuery = {
  hentSoknader: async (parent, args, context) => {
    try {
      return await context.prisma.soknad.findMany();
    } catch (err) {
      throw err;
    }
  },
  hentSoknad: async (parent, args, context) => {
    try {
      return await context.prisma.soknad.findUnique({
        where: {
          id: args.id,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  hentSoknaderSemester: async (parent, args, context) => {
    try {
      const startMonth = args.semester && (args.semester == "host" ? 6 : 0);

      return await context.prisma.soknad.findMany({
        where: {
          innsendt: {
            gte: new Date(args.aar, startMonth),
            lte: new Date(args.aar, startMonth + 6),
          },
        },
      });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { soknadQuery };
