const { gql } = require("apollo-server-express");

const schemaSchema = gql`
  type Ansatt {
    id: Int!
    bruker_id: Int
    fornavn: String!
    mellomnavn: String
    etternavn: String!
    epost: String!
  }

  type Arbeidskategori {
    id: Int!
    navn: String!
    tid_oppretta: String!
    beskrivelse: String
  }

  input AnsiennitetBeboer {
    beboerId: Int!
    ansiennitet: Int!
  }

  type Arbeid {
    id: Int!
    bruker: Bruker!
    godkjent: Int!
    godkjent_av_bruker: Bruker
    kommentar: String
    polymorfkategori_id: Int!
    polymorfkategori_velger: Int
    sekunder_brukt: String!
    tid_godkjent: String
    tid_registrert: String!
    tid_utfort: String!
    tilbakemelding: String
  }

  type AuthData {
    token: String
    tokenExpiration: String
    bruker_id: Int
    beboer_id: Int
    tilgang: Tilgang
  }

  type Beboer {
    adresse: String
    alkoholdepositum: Boolean
    ansiennitet: Float
    bilde: String
    bruker: Bruker
    epost: String
    etternavn: String!
    fodselsdato: String
    fornavn: String!
    id: Int!
    kjonn: Boolean!
    klassetrinn: Int!
    kryss: [Kryss!]
    kundenr: Int
    mellomnavn: String
    status: Int!
    postnummer: Int
    rolle: Rolle
    rom: Rom
    romhistorikk: [Romhistorikk!]
    innflyttet: String
    utflyttet: String
    skole: Skole
    studie: Studie
    telefon: String!
    verv: [Verv!]
    pinkode: Pinkode!
  }

  input BeboerInfo {
    fornavn: String
    mellomnavn: String
    etternavn: String
    epost: String
    telefon: String
    fodselsdato: String
    studie_id: Int
    skole_id: Int
    adresse: String
    klassetrinn: Int
    kundenr: Int
    postnummer: Int
    status: Int
    kjonn: Boolean
    alkoholdepositum: Boolean
    rolle_id: Int
    bilde: String
    rom_id: Int
  }

  type BeboerPrefs {
    beboerId: Int!
    pinboo: Boolean!
    pinkode: Int
    resepp: Boolean!
    vinkjeller: Boolean!
    vinpin: Int
  }

  input BeboerPrefsInput {
    pinboo: Boolean!
    pinkode: Int
    resepp: Boolean!
    vinkjeller: Boolean!
    vinpin: Int
  }

  type Bruker {
    dato: String
    glemt_token: String!
    id: Int!
    beboer: Beboer
  }

  type Drikke {
    id: Int!
    navn: String!
    pris: Float!
    vin: Boolean!
    aktiv: Boolean!
    farge: String!
    kommentar: String
    forst: Boolean
    produktnr: Int
  }

  type EpostPrefs {
    beboer_id: Int!
    tildelt: Boolean!
    snart_vakt: Boolean!
    bytte: Boolean!
    utleie: Boolean!
    barvakt: Boolean!
  }

  input EpostPrefsInput {
    tildelt: Boolean!
    snartVakt: Boolean!
    bytte: Boolean!
    utleie: Boolean!
    barvakt: Boolean!
  }

  type Fakturert {
    id: Int!
    dato: String!
  }

  type Kryss {
    id: Int!
    beboer: Beboer
    drikke: Drikke
    tid: String!
    fakturert: Int!
    antall: Int!
  }

  type Krysseliste {
    id: Int!
    drikke: Drikke!
    krysseliste: [Kryss!]
  }

  type Kunngjoring {
    id: Int!
    publisert: String!
    tittel: String!
    tekst: String
    beboer: Beboer!
  }

  type Pinkode {
    id: Int!
    kode: String
    resep: Boolean!
    vinkjeller: Boolean!
  }

  type RegiStatus {
    semester: String!
    godkjent: Int!
    behandling: Int!
    underkjent: Int!
    gjenvaerende: Int!
    totalt: Int!
  }

  type Rolle {
    id: Int!
    navn: String!
    regitimer: Int
    vakter_h: Int!
    vakter_v: Int!
    beboere: [Beboer!]
  }

  type Rettigheter {
    id: Int!
    navn: String!
    nivaa: Int!
  }

  type Rom {
    id: Int!
    navn: String!
    romtype: Romtype!
    beboer: Beboer
  }

  type Romtype {
    id: Int!
    navn: String!
  }

  type Romhistorikk {
    id: Int!
    rom: Rom!
    innflyttet: String!
    utflyttet: String
  }

  type Skole {
    id: Int!
    navn: String!
    beboere: [Beboer!]
  }

  type Soknad {
    id: Int!
    innsendt: String!
    navn: String!
    adresse: String
    epost: String!
    telefon: String
    fodselsar: Int
    skole: String!
    studie: String!
    fagbrev: Boolean
    kompetanse: String
    kjennskap: String
    kjenner: String
    tekst: String
    bilde: String
  }

  type Studie {
    id: Int!
    navn: String!
    beboere: [Beboer!]
  }

  type Storhybel {
    id: Int!
    semester: String!
    navn: String!
    aktiv: Boolean!
    velger: Int!
    rom: [Int!]
    rekkefolge: [StorhybelRekkefolge!]
    valg: [StorhybelValg]
  }

  type StorhybelRekkefolge {
    beboer: Beboer!
    nummer: Int!
  }

  type StorhybelValg {
    beboer: Beboer!
    gammeltRom: Int
    nyttRom: Int
  }

  type Tilgang {
    utvalget: Boolean!
    kjellermester: Boolean!
    helga: Boolean!
    data: Boolean!
  }

  type Vakt {
    autogenerert: Boolean!
    bekreftet: Boolean
    bruker: Bruker
    bytte: Boolean
    dato: String!
    dobbelvakt: Boolean
    id: Int!
    straffevakt: Boolean
    vaktbytte_id: String
    vakttype: String!
  }

  type VaktAntall {
    bruker: Bruker
    semester: String!
    antall: Int!
  }

  type Verv {
    id: Int!
    navn: String!
    regitimer: Int
    utvalg: Boolean
    epost: String
    beskrivelse: String
    aapmend: [Int]
  }

  type Vin {
    id: Int!
    antall: Float
    avanse: Float
    beskrivelse: String
    bilde: String
    land: String!
    navn: String
    pris: Float
    slettet: Boolean
    type: String
  }

  input RegistrerRegiInput {
    bruker_id: Int!
    kommentar: String
    tid_utfort: String!
    kategori: Int!
    sekunder_brukt: Int!
  }

  type Query {
    glemtPassord(epost: String!): String
    hentAnsatte: [Ansatt!]
    hentAktivDrikke: [Drikke!]
    hentAktivVin: [Vin!]
    hentAlleRom: [Rom!]
    hentArbeidskategorier: [Arbeidskategori!]
    hentArbeid(brukerId: Int, semester: String, aar: Int): [Arbeid!]
    hentBeboer(id: Int!): Beboer!
    hentBeboerKryss(id: Int!): Beboer!
    hentBeboere: [Beboer!]
    hentBeboereKryss: [Beboer!]
    hentBeboerePerm: [Beboer!]
    hentDrikke: [Drikke!]
    hentEpostPrefs(beboerId: Int!): EpostPrefs!
    hentFakturert(fra_dato: String): [Fakturert!]
    hentGamleBeboere: [Beboer!]
    hentKryss(last: Int!): [Kryss!]
    hentKrysseliste(beboerId: Int!): [Krysseliste!]
    hentKunngjoringer: [Kunngjoring!]
    hentLedigeRom: [Rom!]
    hentPinkode(id: Int!): Pinkode!
    hentPinkodeDenneBeboer: Pinkode!
    hentPinkodeBeboer(id: Int!): Pinkode!
    hentPrefs(beboerId: Int!): BeboerPrefs!
    hentRegiStatus(brukerId: Int!, semester: String!, aar: Int!): RegiStatus
    hentRettigheter: [Rettigheter!]
    hentRoller: [Rolle!]
    hentSkole: [Skole!]
    hentSoknad(id: Int!): Soknad!
    hentSoknader: [Soknad!]
    hentSoknaderSemester(aar: Int!, semester: String!): [Soknad!]
    hentStorhybellister: [Storhybel!]
    hentStudie: [Studie!]
    hentVakter(fraDato: String!, tilDato: String!, bruker_id: Int): [Vakt!]
    hentVakterBruker(bruker_id: Int!): Vakt!
    hentVerv: [Verv!]
    sjekkToken: AuthData
  }

  type Mutation {
    fakturerKryss(id: Int!): Kryss!
    fakturerKryssPeriode(startTid: String!, sluttTid: String!): [Kryss!]
    fjernKryss(id: Int!): Kryss!
    flyttBeboer(
      id: Int!
      romId: Int!
      utflytt: String!
      innflytt: String!
    ): Beboer!
    genererVakter(
      fraDato: String!
      fraVakt: Int!
      tilDato: String!
      tilVakt: Int!
    ): [Vakt!]
    lagBeboer(data: BeboerInfo!): Beboer!
    lagDrikke(
      navn: String!
      pris: Float!
      vin: Boolean!
      aktiv: Boolean!
      farge: String!
      kommentar: String
      forst: Boolean
      produktnr: Int
    ): Drikke!
    lagKryss(beboer_id: Int!, drikke_id: Int!, antall: Int!, pin: Int!): Kryss!
    lagKunngjoring(
      beboer_id: Int!
      tittel: String!
      tekst: String
    ): Kunngjoring!
    lagRettigheter(navn: String!, nivaa: Int!): Rettigheter!
    lagSkole(navn: String!): Skole
    lagStorhybelliste(
      navn: String!
      semester: String!
      beboere: [Int!]
      rom: [Int!]
    ): Storhybel!
    lagStudie(navn: String!): Studie!
    lagTommeVakter(fraDato: String!, tilDato: String!, type: Int!): [Vakt!]
    login(epost: String!, passord: String!): AuthData
    migrerRom: [Beboer!]
    migrerPinkode: [Pinkode!]
    oppdaterAnsiennitet(data: [AnsiennitetBeboer!]!): [Beboer!]!
    oppdaterBeboer(id: Int!, info: BeboerInfo!): Beboer!
    oppdaterBeboerAdmin(
      id: Int!
      depositum: Boolean!
      rolleId: Int!
      romId: Int!
      kundenr: Int
    ): Beboer!
    oppdaterDrikke(
      id: Int!
      navn: String!
      pris: Float!
      vin: Boolean!
      aktiv: Boolean!
      farge: String!
      kommentar: String
      forst: Boolean
      produktnr: Int
    ): Drikke!
    oppdaterEpostPrefs(id: Int!, prefs: EpostPrefsInput!): EpostPrefs!
    oppdaterPermStatus(id: Int!, perm: Int!): Beboer!
    oppdaterPrefs(id: Int!, prefs: BeboerPrefsInput!): BeboerPrefs!
    oppdaterPinkodeBruker(
      kode: String!
      resep: Boolean!
      vinkjeller: Boolean!
    ): Pinkode!
    oppdaterPassord(id: Int!, nyttPassord: String!): Bruker!
    oppdaterRettigheter(id: Int!, navn: String!, nivaa: Int!): Rettigheter!
    oppdaterSkole(id: Int!, navn: String!): Skole!
    oppdaterStudie(id: Int!, navn: String!): Studie!
    oppdaterVaktAntall(
      brukerId: Int!
      semester: String!
      antall: Int!
    ): VaktAntall!
    registrerRegi(regi: RegistrerRegiInput): Arbeid!
    resettGlemtPassord(brukerId: Int!, token: String!, passord: String!): String
    slettBeboer(id: Int!): Beboer!
    slettDrikke(id: Int!): Drikke!
    slettRettigheter(id: Int!): Rettigheter!
    slettStorhybelliste(id: Int!): Storhybel!
    slettStudie(id: Int!): Studie!
    slettSkole(id: Int!): Skole!
    vaktSlipp(
      fraDato: String!
      tilDato: String!
      vakttype: Int
      slippDato: String
    ): Int

    migrerRomhistorikk: String
    migrerRomNy: String
    migrerBeboerStatus: String
    migrerKrysseliste: String
    migrerPrefs: String
  }
`;

module.exports = schemaSchema;
