module.exports = {
  beboer: async (beboer_id, context) => {
    try {
      const res = await context.prisma.romhistorikk.findMany({
        where: {
          beboer_id: beboer_id,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  flyttUt: async (id, dato, context) => {
    try {
      const res = await context.prisma.romhistorikk.update({
        where: {
          id: id,
        },
        data: {
          utflyttet: new Date(dato),
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  lag: async (beboer_id, rom_id, innflytt, context) => {
    try {
      const res = await context.romhistorikk.create({
        data: {
          rom: {
            connect: {
              id: rom_id,
            },
          },
          beboer: {
            connect: {
              id: beboer_id,
            },
          },
          innflyttet: innflytt,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
};
