/*
    Denne funksjonen tar inn en start- og sluttdato, en start- og sluttvakt og context for å bruke prisma
    Funksjonen returnerer en liste (array) med de genererte vaktene
*/

const genererVakter = async (args, context) => {
  try {
    const startDato = new Date(args.fraDato);
    const sluttDato = new Date(args.tilDato);
    let dato = startDato;
    let vakter = [];
    /*
      Den ytterste løkken starter på startdato og inkrementerer med én dag av gangen.
      For hver dag tar den andre løkken og går igjennom hver vakttype (1. til 4. vakt).
      Så sjekkes det om vakten skal genereres eller ikke, får den eventuelt blir det.
    */
    for (dato; dato <= sluttDato; dato.setDate(dato.getDate() + 1)) {
      for (let type = 1; type <= 4; type++) {
        if ((type !== 2 || erHelg(dato)) && erITidsrom(args, dato, type)) {
          const vakt = await context.prisma.vakt.create({
            data: {
              vakttype: type,
              dato: dato,
            },
          });

          vakter.push({
            ...vakt,
            // Fjerner tidsstempel ettersom det ser finere ut :)
            dato: vakt.dato.toISOString().split("T")[0],
          });
        }
      }
    }
    return vakter;
  } catch (err) {
    throw err;
  }
};

const erHelg = (dato) => {
  if (dato.getDay() === 0 || dato.getDay() === 6) return true;
  return false;
};

// Funksjon for å sjekke om en vakt er innenfor et gitt tidsrom:
const erITidsrom = (tidsrom, dato, type) => {
  let startDato = new Date(tidsrom.fraDato).setHours(0, 0, 0, 0);
  let sluttDato = new Date(tidsrom.tilDato).setHours(0, 0, 0, 0);
  let aktuellDato = new Date(dato).setHours(0, 0, 0, 0);
  // Sjekker om vakten er mellom start- og sluttdato:
  if (startDato > aktuellDato || aktuellDato > sluttDato) {
    return false;
  }

  // Vakten er innenfor med dato, men her sjekker den om den er innenfor vakttypen også:
  if (
    (aktuellDato == startDato && type < tidsrom.fraVakt) ||
    (aktuellDato == sluttDato && type > tidsrom.tilVakt)
  ) {
    return false;
  }
  return true;
};

module.exports = genererVakter;
