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
      const prefs = await context.prisma.prefs.findMany();
      let pinkode = [];

      for (let i = 0; i <= prefs.length - 1; i++) {
        const beboer = await context.prisma.beboer.findMany({
          where: {
            id: prefs[i].beboer_id,
            pinkode_id: null,
          },
          select: {
            id: true,
          },
        });

        if (beboer.length > 0) {
          const nyPinkode = await context.prisma.pinkode.create({
            data: {
              kode: Number(prefs[i].pinkode),
              vinkjeller: prefs[i].vinkjeller,
              resep: prefs[i].resepp,
            },
          });

          pinkode.push(nyPinkode);
          const answer = await context.prisma.beboer.update({
            where: {
              id: prefs[i].beboer_id,
            },
            data: {
              pinkode_id: nyPinkode.id,
            },
          });
        }
      }

      return pinkode;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { pinkodeQuery, pinkodeMutation };
