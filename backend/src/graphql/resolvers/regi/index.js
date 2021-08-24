const formaterBeboer = require("../beboer/formaterBeboer");

const regiQuery = {
  hentArbeidskategorier: async (parent, args, context) => {
    try {
      // Ligger mange kategorier i db som bare heter ".", vet ikke hvorfor...
      // TODO: Lag en bedre måte å deaktivere kategorier på
      const res = await context.prisma.arbeidskategori.findMany({
        where: {
          navn: {
            not: ".",
          },
        },
      });
      return res.map((kategori) => {
        return {
          ...kategori,
          tid_oppretta: kategori.tid_oppretta.toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  hentRoller: async (parent, args, context) => {
    try {
      return await context.prisma.rolle.findMany();
    } catch (err) {
      throw err;
    }
  },
  hentArbeid: async (parent, args, context) => {
    try {
      // Lager et filter dersom det er satt en bruker-id eller semester:
      const brukerId = args.brukerId && { bruker_id: args.brukerId };
      const startMonth = args.semester && (args.semester == "host" ? 6 : 0);

      let dato;
      if (startMonth) {
        dato = args.aar &&
          args.semester && {
            tid_registrert: {
              gte: new Date(args.aar, startMonth),
              lte: new Date(args.aar, startMonth + 6),
            },
          };
      }

      const filter = { ...brukerId, ...dato };

      // Henter alt arbeid med filteret som ble definert over:
      const res = await context.prisma.arbeid.findMany({
        where: filter,
        select: {
          id: true,
          bruker_arbeid_bruker_idTobruker: {
            include: {
              beboer: true,
            },
          },
          godkjent: true,
          kommentar: true,
          polymorfkategori_id: true,
          sekunder_brukt: true,
          tid_godkjent: true,
          tid_registrert: true,
          tid_utfort: true,
          bruker_arbeid_godkjent_bruker_idTobruker: {
            include: {
              beboer: true,
            },
          },
        },
      });

      return res.map((arb) => {
        // Disse blir kun lagt til dersom regiarbeidet er godkjent:
        const tid_godkjent =
          arb.tid_godkjent !== null ? arb.tid_godkjent.toISOString() : "";
        const godkjent_av_bruker = arb.bruker_arbeid_godkjent_bruker_idTobruker !==
          null && {
          ...arb.bruker_arbeid_godkjent_bruker_idTobruker,
          beboer: formaterBeboer(
            context,
            arb.bruker_arbeid_godkjent_bruker_idTobruker.beboer
          ),
        };

        return {
          ...arb,
          bruker: {
            ...arb.bruker_arbeid_bruker_idTobruker,
            beboer: formaterBeboer(
              context,
              arb.bruker_arbeid_bruker_idTobruker.beboer
            ),
          },
          godkjent_av_bruker: godkjent_av_bruker,
          tid_godkjent: tid_godkjent,
          tid_registrert: arb.tid_registrert.toISOString(),
          tid_utfort: arb.tid_utfort.toISOString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  hentRegiStatus: async (parent, args, context) => {
    try {
      const startMonth = args.semester && (args.semester == "host" ? 6 : 0);

      const beboer = await context.prisma.beboer.findMany({
        where: {
          bruker_id: args.brukerId,
        },
        select: {
          bruker: {
            select: {
              arbeid_arbeid_bruker_idTobruker: {
                select: {
                  godkjent: true,
                  sekunder_brukt: true,
                },
                where: {
                  tid_registrert: {
                    gte: new Date(args.aar, startMonth),
                    lte: new Date(args.aar, startMonth + 6),
                  },
                },
              },
            },
          },
          rolle: {
            select: {
              regitimer: true,
            },
          },
        },
      });

      if (beboer.length > 1) {
        return Error("Flere beoere med samme bruker!");
      } else if (beboer.length < 1) {
        return Error("Fant ingen bruker!");
      }

      const arbeid = beboer[0].bruker.arbeid_arbeid_bruker_idTobruker;
      const regitimer = beboer[0].rolle.regitimer * 60 * 60;

      let godkjent = 0;
      let behandling = 0;
      let underkjent = 0;

      arbeid.forEach((arb) => {
        switch (arb.godkjent) {
          case 1:
            godkjent += arb.sekunder_brukt;
            break;
          case 0:
            behandling += arb.sekunder_brukt;
            break;
          case -1:
            underkjent += arb.sekunder_brukt;
          default:
            break;
        }
      });

      return {
        semester: String(args.semester + "." + args.aar),
        godkjent,
        behandling,
        underkjent,
        gjenvaerende: regitimer - godkjent - behandling,
        totalt: regitimer,
      };
    } catch (err) {
      throw err;
    }
  },
};

const regiMutation = {
  registrerRegi: async (parent, args, context) => {
    try {
      const bruker = await context.prisma.bruker.findOne({
        where: {
          id: args.regi.bruker_id,
        },
      });

      const regi = await context.prisma.arbeid.create({
        data: {
          bruker_arbeid_bruker_idTobruker: bruker,
          polymorfkategori_id: args.regi.kategori,
          polymorfkategori_velger: 0,
          sekunder_brukt: args.regi.sekunder_brukt,
          tid_utfort: new Date().setTime(Number(args.regi.tid_utfort)),
          tilbakemelding: "",
        },
        select: {
          id: true,
          bruker_arbeid_bruker_idTobruker: {
            include: {
              beboer: true,
            },
          },
          godkjent: true,
          kommentar: true,
          polymorfkategori_id: true,
          polymorfkategori_velger: true,
          sekunder_brukt: true,
          tid_godkjent: true,
          tid_registrert: true,
          tid_utfort: true,
          bruker_arbeid_godkjent_bruker_idTobruker: {
            include: {
              beboer: true,
            },
          },
        },
      });

      return {
        ...regi,
        bruker: {
          ...regi.bruker_arbeid_bruker_idTobruker,
          beboer: formaterBeboer(
            context,
            regi.bruker_arbeid_bruker_idTobruker.beboer
          ),
        },
        tid_registrert: regi.tid_registrert.toISOString(),
        tid_utfort: regi.tid_utfort.toISOString(),
      };
    } catch (err) {
      return err;
    }
  },
};

module.exports = { regiQuery, regiMutation };
