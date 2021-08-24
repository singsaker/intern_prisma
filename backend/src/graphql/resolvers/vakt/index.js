const genererVakter = require("./genererVakter");
const tildelVakter = require("./tildelVakter");

const vaktQuery = {
  hentVakter: async (parent, args, context) => {
    try {
      const dato = {
        dato: {
          gte: new Date(args.fraDato),
          lte: new Date(args.tilDato),
        },
      };
      const bruker = args.bruker_id && { bruker_id: args.bruker_id };
      const filter = { ...dato, ...bruker };

      const vakter = await context.prisma.vakt.findMany({
        where: filter,
        include: {
          bruker: true,
        },
      });

      return vakter.map((vakt) => {
        return {
          ...vakt,
          dato: vakt.dato.toISOString().split("T")[0],
        };
      });
    } catch (err) {
      throw err;
    }
  },
};

const vaktMutation = {
  genererVakter: async (parent, args, context) => {
    try {
      const tommeVakter = await genererVakter(args, context);
      return await tildelVakter(tommeVakter, args, context);
    } catch (err) {
      throw err;
    }
  },

  // Oppdaterer vaktantallet til valgt beboer. Hvis ikke oppslaget finnes, genereres det istede
  oppdaterVaktAntall: async (parent, args, context) => {
    try {
      return await context.prisma.vaktantall.upsert({
        where: {
          bruker_semester: {
            bruker_id: args.brukerId,
            semester: args.semester,
          },
        },
        update: {
          antall: args.antall,
        },
        create: {
          bruker: {
            connect: { id: args.brukerId },
          },
          semester: args.semester,
          antall: args.antall,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  // Lager tomme vakter (ikke tildelt) for en gitt vakttype i et gitt tidsrom
  lagTommeVakter: async (parent, args, context) => {
    try {
      const startDato = Date(args.fraDato);
      const sluttDato = Date(args.tilDato);
      let dato = startDato;
      let vakter = [];

      for (dato; dato <= sluttDato; dato.setDate(dato.getDate() + 1)) {
        const vakt = await context.prisma.vakt.create({
          data: {
            vakttype: args.type,
            dato: dato,
          },
        });

        vakter.push({
          ...vakt,
          // Fjerner tidsstempel ettersom det ser finere ut :)
          dato: vakt.dato.toISOString().split("T")[0],
        });
      }
      return vakter;
    } catch (err) {
      throw err;
    }
  },
  vaktSlipp: async (parent, args, context) => {
    try {
      let vakter = [];
      vakter = await context.prisma.vakt.findMany({
        where: {
          bruker_id: {
            equals: null,
          },
          dato: {
            gte: new Date(args.fraDato),
            lte: new Date(args.tilDato),
          },
        },
        select: {
          id: true,
        },
      });

      for (vakt in vakter) {
        const vaktbytte = await context.prisma.vakt.findUnique({
          where: {
            id: vakt.id,
          },
          vaktbytte: {
            create: {
              gisbort: true,
            },
          },
        });

        vakter.push(vaktbytte);
      }

      const antallOppdaterte = await context.prisma.vakt.updateMany({
        where: {
          bruker_id: {
            equals: null,
          },
          dato: {
            gte: new Date(args.fraDato),
            lte: new Date(args.tilDato),
          },
        },
        data: {
          bytte: true,
          vaktbytte: {
            create: {
              gisbort: true,
            },
          },
        },
      });
      return antallOppdaterte.count;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = {
  vaktQuery,
  vaktMutation,
};
