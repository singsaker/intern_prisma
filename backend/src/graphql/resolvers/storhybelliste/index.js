const _ = require("lodash");
const formaterStorhybelliste = require("./formaterStorhybelliste");

const storhybellisteQuery = {
  hentStorhybellister: async (parent, args, context) => {
    try {
      const storhybellister = await context.prisma.storhybel.findMany({
        include: {
          storhybel_fordeling: {
            select: {
              gammel_rom_id: true,
              ny_rom_id: true,
              storhybel_velger: {
                select: {
                  beboer: true,
                },
              },
            },
          },
          storhybel_rekkefolge: {
            include: {
              storhybel_velger: {
                select: {
                  beboer: true,
                },
              },
            },
          },
          storhybel_rom: true,
        },
      });

      return storhybellister.map((liste) => {
        return formaterStorhybelliste(liste);
      });
    } catch (err) {
      throw err;
    }
  },
};

const storhybellisteMutation = {
  lagStorhybelliste: async (parent, args, context) => {
    try {
      let rom = [];
      let beboere = [];
      let beboereObjekt = [];

      for (let i = 0; i < args.rom.length; i++) {
        rom.push({ rom_id: args.rom[i] });
      }

      // Henter alle beboere som er lagt til i liste
      for (let i = 0; i < args.beboere.length; i++) {
        const beboer = await context.prisma.beboer.findUnique({
          where: {
            id: args.beboere[i],
          },
          select: {
            id: true,
            rom: {
              select: {
                id: true,
              },
            },
            ansiennitet: true,
            klassetrinn: true,
          },
        });

        // Lager en liste med beboere som vi senere skal sortere slik at vi kan lage storhybellrekkefølgen
        beboere.push({
          beboer_id: beboer.id,
          ansiennitet: beboer.ansiennitet,
          klassetrinn: beboer.klassetrinn,
          rom_id: beboer.rom ? beboer.rom.id : null,
        });

        // Lager et objekt som brukes til å lage storhybel-velgere samtidig som storhybel blir lagd
        beboereObjekt.push({
          beboer: {
            connect: {
              id: beboer.id,
            },
          },
        });
      }

      // Brukes til å sortere beboerene etter ansiennitet og klassetrinn
      const compare = (a, b) => {
        let comparison = 0;

        if (a.ansiennitet < b.ansiennitet) {
          comparison = 1;
        } else if (a.ansiennitet > b.ansiennitet) {
          comparison = -1;
        } else {
          if (a.klassetrinn < b.klassetrinn) {
            comparison = 1;
          } else if (a.klassetrinn > b.klassetrinn) {
            comparison = -1;
          } else {
            const nr = [-1, 1];
            comparison = nr[Math.floor(Math.random() * nr.length)];
          }
        }

        return comparison;
      };

      // Sorterer listen av bebeore etter ansiennitet og trinn
      beboere.sort(compare);

      // Lager storhybel-objektet, storhybel_rom og alle storhybel-velgere
      const storhybel = await context.prisma.storhybel.create({
        data: {
          semester: args.semester,
          navn: args.navn,
          storhybel_rom: {
            create: rom,
          },
          storhybel_velger: {
            create: beboereObjekt,
          },
        },
        include: {
          storhybel_velger: {
            include: {
              beboer: {
                select: {
                  id: true,
                  rom_id: true,
                },
              },
            },
          },
          storhybel_rom: {
            include: {
              rom: true,
            },
          },
        },
      });

      // Denne lager alle storhybel_rekkefolge-objektene og alle storhybel_fordeling-objektene
      // Looper igjennom alle storhybel_velger-objektene og kobler de nye objektene til riktig storhybel-liste
      for (let k = 0; k < storhybel.storhybel_velger.length; k++) {
        const storVel = storhybel.storhybel_velger[k];
        const nummer =
          _.findIndex(beboere, { beboer_id: storVel.beboer_id }) + 1;

        if (nummer !== -1) {
          await context.prisma.storhybel_velger.update({
            where: {
              velger_id: storVel.velger_id,
            },
            data: {
              storhybel_rekkefolge: {
                create: {
                  storhybel_id: storhybel.id,
                  nummer: nummer,
                },
              },
              storhybel_fordeling: {
                create: {
                  storhybel_id: storhybel.id,
                  gammel_rom_id: storVel.beboer.rom_id,
                },
              },
            },
          });
        }
      }

      // Henter ut den nye storhybellisten samt relatert info
      const ferdigStorhybel = await context.prisma.storhybel.findUnique({
        where: {
          id: storhybel.id,
        },
        include: {
          storhybel_fordeling: {
            select: {
              gammel_rom_id: true,
              ny_rom_id: true,
              storhybel_velger: {
                select: {
                  beboer: true,
                },
              },
            },
          },
          storhybel_rekkefolge: {
            include: {
              storhybel_velger: {
                select: {
                  beboer: true,
                },
              },
            },
          },
          storhybel_rom: true,
        },
      });

      // Formaterer slik at det passer definisjonen i schema.js
      return formaterStorhybelliste(ferdigStorhybel);
    } catch (err) {
      throw err;
    }
  },
  slettStorhybelliste: async (parent, args, context) => {
    try {
      await context.prisma.storhybel.update({
        where: {
          id: args.id,
        },
        data: {
          storhybel_fordeling: {
            deleteMany: {},
          },
          storhybel_rekkefolge: {
            deleteMany: {},
          },
          storhybel_rom: {
            deleteMany: {},
          },
          storhybel_velger: {
            deleteMany: {},
          },
        },
      });

      const storhybelliste = await context.prisma.storhybel.delete({
        where: {
          id: args.id,
        },
        include: {
          storhybel_fordeling: {
            select: {
              gammel_rom_id: true,
              ny_rom_id: true,
              storhybel_velger: {
                select: {
                  beboer: true,
                },
              },
            },
          },
          storhybel_rekkefolge: {
            include: {
              storhybel_velger: {
                select: {
                  beboer: true,
                },
              },
            },
          },
          storhybel_rom: true,
        },
      });

      return formaterStorhybelliste(storhybelliste);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { storhybellisteQuery, storhybellisteMutation };
