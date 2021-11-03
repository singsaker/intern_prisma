const pinkodeQuery = {
  hentPinkode: async (parent, args, context) => {
    try {
      return await context.prisma.pinkode.findUnique({
        where: {
          id: args.id,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  hentPinkodeBeboer: async (parent, args, context) => {
    try {
      const beboer = await context.prisma.beboer.findUnique({
        where: {
          id: args.id,
        },
        select: {
          pinkode: true,
        },
      });

      return beboer.pinkode;
    } catch (err) {
      throw err;
    }
  },
  hentPinkodeDenneBeboer: async (parent, args, context) => {
    try {
      const beboer = await context.prisma.beboer.findUnique({
        where: {
          id: context.req.beboerId,
        },
        select: {
          pinkode: true,
        },
      });

      return beboer.pinkode;
    } catch (err) {
      throw err;
    }
  },
  sjekkPinkodeDenneBeboer: async (parent, args, context) => {
    try {
      const beboer = await context.prisma.beboer.findUnique({
        where: {
          id: context.req.beboerId,
        },
        select: {
          pinkode: true,
        },
      });

      return beboer.pinkode === args.kode;
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
            status: 1,
          },
          select: {
            id: true,
          },
        });

        if (beboer.length > 0) {
          const nyPinkode = await context.prisma.pinkode.create({
            data: {
              kode: prefs[i].pinkode,
              vinkjeller: prefs[i].vinkjeller,
              resep: prefs[i].resepp,
            },
          });

          pinkode.push(nyPinkode);
          await context.prisma.beboer.update({
            where: {
              id: beboer[0].id,
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
  // Oppdaterer pinkode-informasjon til den innloggede brukeren:
  oppdaterPinkodeBruker: async (parent, args, context) => {
    try {
      const PATTERN = /^(\d{4}|\d{6})$/;
      if (!PATTERN.test(args.kode)) {
        throw Error("Pinkoden må være 4 eller 6 tegn og kun bestå av tall!");
      }

      const beboer = await context.prisma.beboer.update({
        where: {
          id: context.req.beboerId,
        },
        data: {
          pinkode: {
            update: args,
          },
        },
        select: {
          pinkode: true,
        },
      });
      return beboer.pinkode;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { pinkodeQuery, pinkodeMutation };
