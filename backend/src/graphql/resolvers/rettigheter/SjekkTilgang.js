//  Denne funksjonen sjekker om brukeren har tilgang til den spesifikke resolveren.
//  Rollene fungerer i et hierarki - dvs. har brukeren rollen "3 Utvalget", har den
//  også alle rettighetene til understående roller (Spesialist, beboer).
//
//  Roller per 31.10.2021:
//  Nivå - NAVN
//  1   Global Administrator
//  2   Utvalget
//  3   Spesialist
//  4   Beboer
//
//  krevdRolle er en String med rollen som kreves for å utføre funksjonen.
//  krevdVerv brukes når krevdRolle == "Spesialist". krevdVerv må være en array med Strings - navnene på krevd verv.
async function SjekkTilgang(context, krevdRolle, krevdVerv = null) {
  try {
    const beboerRolle = context.req.rolle;
    const ROLLER = await context.prisma.rettigheter.findMany({
      orderBy: [
        {
          nivaa: "asc",
        },
      ],
    });

    const beboerNivaa =
      ROLLER.find((x) => x.navn == beboerRolle) !== undefined
        ? ROLLER.find((x) => x.navn == beboerRolle).nivaa
        : Infinity;

    const krevdNivaa = ROLLER.find((x) => x.navn == krevdRolle).nivaa;

    // Dersom beboeren har en høyere rolle enn krevd rolle, return true:
    if (beboerNivaa < krevdNivaa) {
      return true;
    } else if (beboerRolle === "Spesialist" && krevdRolle === "Spesialist") {
      // Dersom den krevde rollen er spesialist og beboeren ikke har noen høyere rolle,
      // må det sjekkes om beboer har det rette veret:
      if (krevdVerv === null)
        return Error("Krevd verv må spesifiseres! Kontakt administrator.");

      // Henter vervene til beboer:
      const beboer = await context.prisma.beboer.findUnique({
        where: {
          id: context.req.beboer_id,
        },
        select: {
          beboer_verv: {
            select: {
              verv: true,
            },
          },
        },
      });

      // Henter ut verv-navnene til beboeren:
      const verv =
        beboer.beboer_verv &&
        beboer.beboer_verv.verv.map((v) => {
          return v.navn;
        });

      // Dersom brukeren har riktig verv, return true:
      if (verv.includes(krevdVerv)) {
        return true;
      } else {
        return false;
      }
    } else if (beboerNivaa === krevdNivaa) {
      // Dersom brukeren har rett rolle, og rollen ikke er spesialist, return true:
      return true;
    } else {
      // Dersom brukeren ikke har rett rolle, return false:
      return false;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { SjekkTilgang };
