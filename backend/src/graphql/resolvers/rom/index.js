const DB = require("../../database");

const romQuery = {
  hentAlleRom: async (parent, args, context) => {
    try {
      return DB.rom.alle(context);
    } catch (err) {
      throw err;
    }
  },

  hentLedigeRom: async (parent, args, context) => {
    try {
      return DB.rom.ledige(context);
    } catch (err) {
      throw err;
    }
  },
};

const romMutation = {
  // Setter rom_id til det siste rommet i romhistorikk
  // Denne brukes til å migrere fra den gamle måten å holde styr på romfordeling - hvor det ble hentet ut av romhistorikk
  migrerRom: async (parent, args, context) => {
    try {
      const beboere = await context.prisma.beboer.findMany({
        where: {
          NOT: {
            fornavn: {
              contains: "Utvalget",
            },
          },
          romhistorikk: {
            contains: '"utflyttet":null',
          },
          perm: 0,
        },
        select: {
          id: true,
          romhistorikk: true,
        },
      });

      let nyeBeboere = [];

      for (let i = 0; i < beboere.length; i++) {
        const beboerRom = JSON.parse(beboere[i].romhistorikk);
        const tattRom = await context.prisma.beboer.findMany({
          where: {
            rom_id: Number(beboerRom[beboerRom.length - 1].romId),
            NOT: {
              id: beboere[i].id,
            },
          },
          select: {
            id: true,
          },
        });
        let romId = null;
        if (tattRom.length === 0 && beboerRom.length > 0) {
          romId = Number(beboerRom[beboerRom.length - 1].romId);
        }
        const nyBeboer = await context.prisma.beboer.update({
          where: {
            id: beboere[i].id,
          },
          data: {
            rom_id: romId,
          },
        });
        nyeBeboere.push({ ...nyBeboer, romhistorikk: beboerRom });
      }

      return nyeBeboere;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { romQuery, romMutation };
