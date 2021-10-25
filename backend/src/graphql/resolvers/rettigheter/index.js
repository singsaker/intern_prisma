const rettigheterQuery = {
  hentRettigheter: async (parent, args, context) => {
    try {
      return await context.prisma.rettigheter.findMany();
    } catch (err) {
      throw err;
    }
  },
};

const rettigheterMutation = {
  lagRettigheter: async (parent, args, context) => {
    try {
      return await context.prisma.rettigheter.create({
        data: {
          navn: args.navn,
          nivaa: args.nivaa,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  oppdaterRettigheter: async (parent, args, context) => {
    try {
      return await context.prisma.rettigheter.update({
        where: {
          id: args.id,
        },
        data: {
          navn: args.navn,
          nivaa: args.nivaa,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  slettRettigheter: async (parent, args, context) => {
    try {
      return await context.prisma.rettigheter.delete({
        where: {
          id: args.id,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { rettigheterMutation, rettigheterQuery };
