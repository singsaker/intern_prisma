module.exports = {
  alle: async (context) => {
    try {
      const res = await context.prisma.rom.findMany({
        include: {
          romtype: true,
          beboer: true,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  ledige: async (context) => {
    try {
      return await context.prisma.rom.findMany({
        where: {
          beboer: null,
        },
        include: {
          romtype: true,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};
