// Denne funksjonen tar inn context (for å bruke prisma) og et beboer-objekt
// Returnerer et ferdig "Beboer"-objekt

module.exports = async (context, beboer) => {
  try {
    let verv = [];
    if (beboer.beboer_verv && beboer.beboer_verv.length > 0) {
      verv = beboer.beboer_verv.map((beboer_verv) => {
        return beboer_verv.verv;
      });
    }

    const beboerRom = JSON.parse(beboer.romhistorikk);
    let innflyttet = "";

    if (beboerRom.length > 0) {
      innflyttet = beboerRom[0].innflyttet;
    }

    const fodselsdato = JSON.stringify(
      beboer.fodselsdato.toISOString().split("T")[0]
    ).replace(/"/g, "");

    return {
      ...beboer,
      romhistorikk: beboerRom,
      fodselsdato,
      innflyttet,
      verv,
    };
  } catch (err) {
    throw err;
  }
};
