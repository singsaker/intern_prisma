const pinkodeQuery = {
  hentPinkode: async (parent, args, context) => {
    try {
      return await context.prisma.pinkode.findUniqe({
        where: {
          id: args.id,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};

const pinkodeMutation = {
  migrerPinkode: async (parent, args, context) => {
    try {
    } catch (err) {
      throw err;
    }
  },
};
