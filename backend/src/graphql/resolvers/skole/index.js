const { isString } = require("lodash");
const formaterBeboer = require("../beboer/formaterBeboer");

const skoleQuery = {
  hentSkole: async (parent, args, context) => {
    try {
      return await context.prisma.skole.findMany();
    } catch (err) {
      throw err;
    }
  },
  hentStudie: async (parent, args, context) => {
    try {
      return await context.prisma.studie.findMany();
    } catch (err) {
      throw err;
    }
  },
};

const skoleMutation = {
  lagStudie: async (parent, args, context) => {
    try {
      return await context.prisma.studie.create({
        data: {
          navn: args.navn,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  oppdaterStudie: async (parent, args, context) => {
    try {
      if (args.navn.length > 0 && isString(args.navn)) {
        return await context.prisma.studie.update({
          where: {
            id: args.id,
          },
          data: {
            navn: args.navn,
          },
        });
      } else {
        return Error("Ikke et gyldig navn!");
      }
    } catch (err) {
      throw err;
    }
  },
  slettStudie: async (parent, args, context) => {
    try {
      await context.prisma.beboer.updateMany({
        where: {
          studie_id: args.id,
        },
        data: {
          studie_id: null,
        },
      });

      return await context.prisma.studie.delete({
        where: {
          id: args.id,
        },
      });
    } catch (err) {
      throw err;
    }
  },
  lagSkole: async (parent, args, context) => {
    try {
      const res = await context.prisma.skole.create({
        data: {
          navn: args.navn
        },
        include: {
          beboer: true
        }
      });


      return {
        ...res,
        beboer: res.beboer.map(beb => formaterBeboer(beb))
      }

    }
    catch (err) {
      throw err;
    }
  },
  oppdaterSkole: async (parent, args, context) => {
    try {
      if (args.navn.length > 0 && isString(args.navn)) {
        return await context.prisma.skole.update({
          where: {
            id: args.id
          },
          data: {
            navn: args.navn
          }
        })
      }
      else {
        return Error("Ikke et gyldig navn!");
      }
    }
    catch (err) {
      throw err;
    }
  },
  slettSkole: async (parent, args, context) => {
    try {
      await context.prisma.beboer.updateMany({
        where: {
          skole_id: args.id,
        },
        data: {
          skole_id: null,
        },
      });
      return await context.prisma.skole.delete({
        where: {
          id: args.id
        }
      })
    }
    catch (err) {
      throw err;
    }
  }
};


module.exports = { skoleQuery, skoleMutation };
