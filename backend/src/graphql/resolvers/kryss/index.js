const { ApolloError } = require("apollo-server-express");
const _ = require("lodash");

const kryssQuery = {
  hentAktivVin: async (parent, args, context) => {
    try {
      const vin = await context.prisma.vin.findMany({
        where: {
          slettet: 0,
        },
        include: {
          vintype: true,
        },
      });

      return vin.map((flaske) => {
        return { ...flaske, type: flaske.vintype.navn };
      });
    } catch (err) {
      throw err;
    }
  },
  hentAktivDrikke: async (parent, args, context) => {
    try {
      return await context.prisma.drikke.findMany({
        where: {
          aktiv: true,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  hentFakturert: async (parent, args, context) => {
    try {
      const filter = args.fra_dato && { dato: { gte: args.fra_dato } };

      const res = await context.prisma.fakturert.findMany({
        where: filter,
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  // hentKrysseliste: async (parent, args, context) => {
  //   try {
  //     const krysseListe = await context.prisma.krysseliste.findMany({
  //       where: {
  //         beboer_id: args.beboerId,
  //       },
  //       include: {
  //         drikke: true,
  //       },
  //     });

  //     return krysseListe.map((liste) => {
  //       return {
  //         ...liste,
  //         krysseliste: JSON.parse(liste.krysseliste),
  //       };
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};

const kryssMutation = {
  // migrerKrysseliste: async (parent, args, context) => {
  //   try {
  //     const krysselister = await context.prisma.krysseliste.findMany();
  //     let nyeKryss = [];
  //     const drikke = await context.prisma.drikke.findMany({
  //       select: {
  //         id: true,
  //       },
  //     });
  //     console.log(drikke);
  //     let drikkeIder = drikke.map((x) => {
  //       return x.id;
  //     });
  //     console.log(drikkeIder);
  //     for (x in krysselister) {
  //       const liste = krysselister[x];
  //       const drikkeKryss = JSON.parse(liste.krysseliste);
  //       if (_.indexOf(drikkeIder, liste.drikke_id) === -1) {
  //         continue;
  //       }
  //       for (y in drikkeKryss) {
  //         nyeKryss.push({
  //           beboer: { connect: { id: liste.beboer_id } },
  //           drikke: { connect: { id: liste.drikke_id } },
  //           antall: Number(drikkeKryss[y].antall),
  //           tid: new Date(drikkeKryss[y].tid),
  //           fakturert: drikkeKryss[y].fakturert === 1 ? true : false,
  //         });
  //       }
  //     }
  //     for (z in nyeKryss) {
  //       await context.prisma.kryss.create({
  //         data: nyeKryss[z],
  //       });
  //     }
  //     return null;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  fakturerKryss: async (parent, args, context) => {
    try {
      const kryss = await context.prisma.kryss.update({
        where: {
          id: args.id,
        },
        data: {
          fakturert: true,
        },
        include: {
          beboer: true,
          drikke: true,
        },
      });
      return kryss;
    } catch (err) {
      throw err;
    }
  },
  fakturerKryssPeriode: async (parent, args, context) => {
    try {
      const kryss = await context.prisma.kryss.updateMany({
        where: {
          tid: {
            lte: new Date(args.sluttTid),
            gte: new Date(args.startTid),
          },
          fakturert: false,
        },
        data: {
          fakturert: true,
        },
      });

      if (kryss.count <= 0) {
        return ApolloError("Ingen kryss ble fakturert!");
      }

      return await context.prisma.kryss.findMany({
        where: {
          tid: {
            lte: new Date(args.sluttTid),
            gte: new Date(args.startTid),
          },
        },
        include: {
          beboer: true,
          drikke: true,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  lagKryss: async (parent, args, context) => {
    try {
      const drikke = await context.prisma.drikke.findUnique({
        where: {
          id: args.drikke_id,
        },
        select: {
          aktiv: true,
        },
      });

      if (!drikke.aktiv) {
        return new ApolloError(
          "Drikken du prøver å krysse er ikke aktiv. Kontakt vaktsjef eller din nærmeste dataåmand!"
        );
      }

      const kryss = await context.prisma.kryss.create({
        data: {
          beboer: {
            connect: {
              id: args.beboer_id,
            },
          },
          drikke: {
            connect: {
              id: args.drikke_id,
            },
          },
          antall: args.antall,
        },
        include: {
          drikke: true,
          beboer: true,
        },
      });

      return kryss;
    } catch (err) {
      throw err;
    }
  },
  fjernKryss: async (parent, args, context) => {
    try {
      const kryss = await context.prisma.kryss.delete({
        where: {
          id: args.id,
        },
        include: {
          drikke: true,
          beboer: true,
        },
      });

      return kryss;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { kryssQuery, kryssMutation };
