const DEFAULT_BEBOER = {
  rolle: true,
  studie: true,
  skole: true,
  bruker: true,
  rom: {
    include: {
      romtype: true,
    },
  },
  beboer_verv: {
    include: {
      verv: true,
    },
  },
  romhistorikk: {
    include: {
      rom: {
        include: {
          romtype: true,
        },
      },
    },
  },
};

module.exports = {
  alle: async (context) => {
    try {
      const res = await await context.prisma.beboer.findMany({
        where: {
          status: 1,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  unik: async (beboer_id, context) => {
    try {
      const res = await await context.prisma.beboer.findUnique({
        where: {
          id: beboer_id,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  gamle: async (context) => {
    try {
      const res = await context.prisma.beboer.findMany({
        where: {
          status: 0,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  perm: async (context) => {
    try {
      const res = await context.prisma.beboer.findMany({
        where: {
          status: 2,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  flyttTil: async (beboer_id, rom_id, context) => {
    try {
      const res = await context.prisma.beboer.update({
        where: {
          id: beboer_id,
        },
        data: {
          rom: {
            connect: {
              id: rom_id,
            },
          },
          romhistorikk: {
            create: {
              rom: {
                connect: {
                  id: args.romId,
                },
              },
              innflyttet: new Date(args.innflytt),
            },
          },
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdaterAnsiennitet: async (beboer_id, ansiennitet, context) => {
    try {
      const res = await context.prisma.beboer.update({
        where: {
          id: beboer_id,
        },
        data: {
          ansiennitet: ansiennitet,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdater: async (beboer_id, data, context) => {
    try {
      const res = await context.prisma.beboer.update({
        where: { id: args.id },
        data: {
          fornavn: data.fornavn,
          mellomnavn: data.mellomnavn,
          etternavn: data.etternavn,
          adresse: data.adresse,
          postnummer: data.postnummer,
          epost: data.epost,
          telefon: data.telefon,
          klassetrinn: data.klassetrinn,
          fodselsdato: data.fodselsdato,
          kundenr: data.kundenr,
          studie: {
            connect: {
              id: data.studie_id,
            },
          },
          skole: {
            connect: {
              id: data.skole_id,
            },
          },
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdaterPermstatus: async (beboer_id, perm_status, context) => {
    try {
      const res = await context.prisma.beboer.update({
        where: {
          id: beboer_id,
        },
        data: {
          perm: perm_status,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  oppdaterAdmin: async (
    beboer_id,
    depositum,
    rom_id,
    rolle_id,
    kundenr,
    context
  ) => {
    try {
      const res = await context.prisma.beboer.update({
        where: {
          id: beboer_id,
        },
        data: {
          alkoholdepositum: depositum,
          rom_id: rom_id,
          rolle_id: rolle_id,
          kundenr: kundenr,
        },
        include: {
          ...DEFAULT_BEBOER,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
  slettSkole: async (skole_id, context) => {
    try {
      const res = await context.prisma.beboer.updateMany({
        where: {
          skole_id: skole_id,
        },
        data: {
          skole_id: null,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  },
  slettStudie: async (studie_id, context) => {
    try {
      const res = await context.prisma.beboer.updateMany({
        where: {
          studie_id: studie_id,
        },
        data: {
          studie_id: null,
        },
      });

      return res;
    } catch (err) {
      throw err;
    }
  },
};
