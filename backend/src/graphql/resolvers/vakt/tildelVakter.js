const _ = require("lodash");
/*
  Funksjonene tar inn tre argumenter:
  - vakter: Genererte vakter som ikke er blitt tildelt en beboer
  - args: Brukes kun til å hente tilDato
  - context: Brukes som vanlig til å kunne bruke prisma
  
  -- Initialisering:
  1. Hent alle beboere som skal ha vakt
  2. Sorter vaktene (som funksjonen tar som argument) etter typene: vanlig, kjip og første
  3. Hent de aktuelle rollene - altså "Full vakt" og "Halv vakt/halv regi"
  4. Sorter beboerne etter rolle
  5. Lag et objekt hvor hver rolletype inneholder alle beboere med den rollen, indeksert med antallet vakter som skal autogenereres per person (ca. linje 156)
  
  -- Hovedloop:
  6. Loop igjennom vakttypene
  7. For hver vaktttype, looper vi igjennom hver rolletype
  8. Trekk tilfeldig vakt i den aktuelle typen og en tilfeldig beboer
    - Her prøver funksjonen å trekke vakt på nytt dersom vakten kommer tett på tidligere delegerte vakter
  9. Legger så vakten til riktig beboer/bruker i "oversikt"
  
  -- Avlutning:
  10. Looper igjennom hver bruker i "oversikt" og oppdaterer hver vakt i db
  11. Returner en array av Vakt-objekter som ble oppdatert
*/

const tildelVakter = async (vakter, args, context) => {
  try {
    const sluttDato = new Date(args.tilDato);
    const startMonth = sluttDato.getMonth() < 6 ? 0 : 6;
    let oversikt = {};

    let vanligeVakter = {};
    let kjipeVakter = {};
    let forsteVakter = {};

    let halvVakt = {};
    let fullVakt = {};

    /*
      Her henter vi alle beboere som ikke har full regi, trenger kun å ta med id og rolle_id.
      Vi inkluderer alle vakter beboeren har hatt det akutelle semesteret hvor det skal tildeles vakter.
    */
    const beboere = await context.prisma.beboer.findMany({
      where: {
        NOT: [
          {
            fornavn: {
              contains: "Utvalget",
            },
          },
          {
            rolle_id: 3,
          },
        ],
        AND: {
          romhistorikk: {
            contains: '"utflyttet":null',
          },
        },
      },
      select: {
        id: true,
        rolle_id: true,
        bruker: {
          select: {
            id: true,
            vakt: {
              where: {
                dato: {
                  gte: new Date(sluttDato.getFullYear(), startMonth),
                  lte: new Date(sluttDato.getFullYear(), startMonth + 6),
                },
              },
            },
          },
        },
      },
    });

    // Fordeler vaktene i typene over:
    vakter.forEach((vakt) => {
      const dag = new Date(vakt.dato).getDay();
      if (vakt.vakttype === 1) return (forsteVakter[vakt.id] = vakt);
      if (
        dag === 6 ||
        (dag === 5 && (vakt.vakttype === 3 || vakt.vakttype === 4)) ||
        (dag === 0 && (vakt.vakttype === 2 || vakt.vakttype === 3)) ||
        vakt.autogenerert === 0
      )
        return (kjipeVakter[vakt.id] = vakt);
      return (vanligeVakter[vakt.id] = vakt);
    });

    // Henter rollene som skal sitte vakt:
    const roller = await context.prisma.rolle.findMany({
      where: {
        AND: [
          {
            vakter_h: {
              gt: 0,
            },
          },
          {
            vakter_v: {
              gt: 0,
            },
          },
        ],
      },
    });

    // Sorterer beboere som skal sitte vakt etter rolle:
    beboere.forEach((beb) => {
      // Lager en oversikt over alle vakter som blir tildelt en beboer:
      oversikt[beb.bruker.id] = [];

      let vaktAntallKrav = null;
      const rolleIndex = _.findIndex(roller, { id: beb.rolle_id });

      // Finner antall vakter som beboeren skal ha til sammen:
      if (startMonth === 0) {
        vaktAntallKrav = roller[rolleIndex].vakter_v;
      } else {
        vaktAntallKrav = roller[rolleIndex].vakter_h;
      }
      // Legger ikke til beboeren i oversikt dersom den har fullført alle vakter for semesteret:
      if (beb.bruker.vakt.length >= vaktAntallKrav) return;
      const beboerObjekt = {
        id: beb.id,
        bruker_id: beb.bruker.id,
        fullforteVakter: beb.bruker.vakt.length,
        krav: vaktAntallKrav,
      };

      if (beb.rolle_id === 1) {
        halvVakt[beb.id] = beboerObjekt;
      } else {
        fullVakt[beb.id] = beboerObjekt;
      }
    });

    let fordeling = {};
    roller.forEach((rolle) => {
      let antall = null;
      if (new Date(args.tilDato).getMonth() < 6) {
        antall = Math.floor((rolle.vakter_v * 2) / 3);
      } else {
        antall = Math.floor((rolle.vakter_h * 2) / 3);
      }

      switch (rolle.id) {
        case 1:
          fordeling = { ...fordeling, [antall]: halvVakt };
          break;
        case 2:
          fordeling = { ...fordeling, [antall]: fullVakt };
          break;
        default:
          break;
      }
    });

    /*
      Fordeling ser ca. slik ut:
      
      let fordeling = {
        '3': {
            '234': { fullforteVakter: 6 },
            '480': { fullforteVakter: 6 },
            '506': { fullforteVakter: 3 },
            '510': { fullforteVakter: 6 },
            '551': { fullforteVakter: 4 },
            '590': { fullforteVakter: 6 },
            '603': { fullforteVakter: 6 },
            ...
          },
        '5': {
            '435': { fullforteVakter: 6 },
            '678': { fullforteVakter: 6 },
            '654': { fullforteVakter: 7 },
            '234': { fullforteVakter: 6 },
            '765': { fullforteVakter: 7 },
            '246': { fullforteVakter: 6 },
            '835': { fullforteVakter: 6 },
            ...
            }
          };
    */

    const vakterFordelt = { forsteVakter, kjipeVakter, vanligeVakter };

    /*
      Hovedloop. Vi deler først ut førstevakter, deretter de øvrige kjipe vaktene og til sist de andre vaktene - i tre "runder".
    */

    for (vaktType in vakterFordelt) {
      for (antall in fordeling) {
        let tmp = fordeling[antall];

        while (_.size(tmp) > 0) {
          // Velg en tilfeldig beboer
          const tmpKeys = _.keys(tmp);
          const randomBeboer = tmp[tmpKeys[_.random(tmpKeys.length - 1)]];

          // Velg en tilfeldig vakt fra de gjenværende vaktene
          const vaktKeys = _.keys(vakterFordelt[vaktType]);
          let vaktIndex = vaktKeys[_.random(vaktKeys.length - 1)];
          const randomVakt = vakterFordelt[vaktType][vaktIndex];

          if (!randomVakt) break;

          // Denne løkken prøver 10 ganger med å trekke en vakt for beboeren
          for (let i = 0; i < 10; i++) {
            let flag = true;

            // Ser i oversikt om beboeren har fått en vakt som er +/- 7 dager. Hvis det er tilfelle, trekkes det på nytt
            for (vakt in oversikt[randomBeboer.bruker_id]) {
              // Regner ut differansen mellom vaktene i dager
              const enDag = 24 * 60 * 60 * 1000;
              const datoVakt = new Date(vakt.dato);
              const datoNyVakt = new Date(randomVakt.dato);
              const differanseDager = Math.round(
                Math.abs((datoVakt.getTime() - datoNyVakt.getTime()) / enDag)
              );

              if (differanseDager < 7) {
                flag = false;
              }
            }

            // Hopper ut av løkken dersom differansen ikke er mindre enn 7 dager
            // mellom ny vakt og noen av de tidligere tildelte vaktene
            if (flag) break;

            // Trekker en ny vakt
            vaktIndex = vaktKeys[_.random(vaktKeys.length - 1)];
          }

          // Denne løkken prøver igjen 10 ganger på å trekke en vakt for beboeren
          for (let i = 0; i < 10; i++) {
            let flag = 0;

            // Ser i oversikt om beboeren har mer enn 2 vakter innenfor en periode på 3 uker. Hvis det er tilfelle, trekkes det på nytt
            for (vakt in oversikt[randomBeboer.bruker_id]) {
              // Regner ut differansen mellom vaktene i dager
              const enDag = 24 * 60 * 60 * 1000;
              const datoVakt = new Date(vakt.dato);
              const datoNyVakt = new Date(randomVakt.dato);
              const differanseDager = Math.round(
                Math.abs((datoVakt.getTime() - datoNyVakt.getTime()) / enDag)
              );

              if (differanseDager < 21) {
                flag++;
              }
            }

            if (flag < 3) {
              break;
            }

            // Trekker en ny vakt
            vaktIndex = vaktKeys[_.random(vaktKeys.length - 1)];
          }

          /*
            Beboeren slettes fra halvVakt/fullVakt-lista dersom vaktkvoten er fyllt opp.
            Hvis ikke, inkrementeres "fullførteVakter"
          */
          if (randomBeboer.fullforteVakter + 1 === randomBeboer.krav) {
            delete halvVakt[randomBeboer.id];
            delete fullVakt[randomBeboer.id];
          } else {
            if (_.has(halvVakt, randomBeboer.id)) {
              halvVakt[randomBeboer.id].fullforteVakter++;
            } else {
              fullVakt[randomBeboer.id].fullforteVakter++;
            }
          }

          /*
            Beboeren velges til denne vakta. Vakta fjernes fra lista, mens beboeren blir fjerna fra denne
            runden.
          */
          oversikt[randomBeboer.bruker_id].push(randomVakt);
          delete vakterFordelt[vaktType][randomVakt.id];
          delete tmp[randomBeboer];
        }
      }
    }

    let resultat = [];
    /*
      For hver bruker i oversikt, tar den hver tildelte vakt og oppdaterer db
    */
    for (const bruker in oversikt) {
      if (oversikt[bruker].length > 0) {
        for (let i = 0; oversikt[bruker].length > i; i++) {
          const res = await context.prisma.vakt.update({
            where: {
              id: oversikt[bruker][i].id,
            },
            data: {
              bruker: {
                connect: { id: parseInt(bruker) },
              },
              autogenerert: false,
            },
          });
          resultat.push(res);
        }
      }
    }

    return resultat;
  } catch (err) {
    throw err;
  }
};

module.exports = tildelVakter;
