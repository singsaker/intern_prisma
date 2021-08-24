const vervQuery = {
  hentVerv: async (parent, args, context) => {
    try {
      const verv = await context.prisma.verv.findMany({
        include: {
          beboer_verv: true,
        },
      });

      return verv.map((vervet) => {
        return {
          ...vervet,
          aapmend: vervet.beboer_verv.map((beboer) => {
            return beboer.beboer_id;
          }),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { vervQuery };
