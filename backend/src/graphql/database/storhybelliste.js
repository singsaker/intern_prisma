module.exports = {
  alle: async (context) => {
    try {
      const storhybellister = await context.prisma.storhybelliste.findMany({
        include: {
          storhybelliste_rom: {
            include: {
              rom: {
                include: {
                  romtype: true,
                },
              },
            },
          },
          storhybelliste_velger: {
            include: {
              beboer: true,
              rom_romTostorhybelliste_velger_gammelt_rom_id: {
                include: {
                  romtype: true,
                },
              },
              rom_romTostorhybelliste_velger_nytt_rom_id: {
                include: {
                  romtype: true,
                },
              },
            },
          },
        },
      });
      return storhybellister;
    } catch (err) {
      throw err;
    }
  },
  lag: async (args, context) => {
    const storhybelliste = await context.prisma.storhybelliste.create({
      data: {
        navn: args.navn,
        paamelding_start: new Date(args.paamelding_start),
        velging_start: new Date(args.velging_start),
      },
      include: {
        storhybelliste_rom: {
          include: {
            rom: {
              include: {
                romtype: true,
              },
            },
          },
        },
        storhybelliste_velger: {
          include: {
            beboer: true,
            rom_romTostorhybelliste_velger_gammelt_rom_id: {
              include: {
                romtype: true,
              },
            },
            rom_romTostorhybelliste_velger_nytt_rom_id: {
              include: {
                romtype: true,
              },
            },
          },
        },
      },
    });

    return storhybelliste;
  },
};
