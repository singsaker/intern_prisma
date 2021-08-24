const formaterBeboer = require("../beboer/formaterBeboer");

const kunngjoringQuery = {
  hentKunngjoringer: async (parent, args, context) => {
    try {
      const kunngjoringer = await context.prisma.kunngjoring.findMany({
        include: {
          beboer: true,
        },
      });

      return (res = kunngjoringer.map((kunngjoring) => {
        return {
          ...kunngjoring,
          publisert: kunngjoring.publisert.toISOString(),
          beboer: formaterBeboer(context, kunngjoring.beboer),
        };
      }));
    } catch (err) {
      throw err;
    }
  },
};

const kunngjoringMutation = {
  lagKunngjoring: async (parent, args, context) => {
    try {
      return await context.prisma.kunngjoring.create({
        data: {
          tittel: args.tittel,
          beboer: {
            connect: { id: args.beboer_id },
          },
          tekst: args.tekst,
          publisert: new Date(),
        },
        include: {
          beboer: true,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { kunngjoringQuery, kunngjoringMutation };
