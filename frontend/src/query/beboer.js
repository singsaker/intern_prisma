import { gql } from "apollo-boost";

const BEBOER = `
    id
    fornavn
    mellomnavn
    etternavn
    telefon
    epost
    klassetrinn
    kjonn
    adresse
    postnummer
    bruker {
      id
    }
    fodselsdato
    studie {
      id
      navn
    }
    rolle {
      id
      navn
    }
    rom {
      id
      navn
      romtype {
        id
        navn
      }
    }
    romhistorikk {
      romId
      innflyttet
      utflyttet
    }
    verv {
      navn
    }
    perm
    skole {
      id
      navn
    }
    innflyttet
    alkoholdepositum
    ansiennitet
    kundenr
`;

export const GET_BEBOER = gql`
  query GetBeboer($id: Int!) {
    hentBeboer(id: $id) {
      ${BEBOER}
    }
  }
`;

export const UPDATE_BEBOER = gql`
  mutation OppdaterBeboer(
    $id: Int!
    $epost: String
    $telefon: String
    $fodselsdato: String
    $studie_id: Int
    $skole_id: Int
    $adresse: String
    $klassetrinn: Int
    $fornavn: String
    $mellomnavn: String
    $etternavn: String
    $postnummer: Int
  ) {
    oppdaterBeboer(
      id: $id
      info: {
        epost: $epost
        telefon: $telefon
        fodselsdato: $fodselsdato
        studie_id: $studie_id
        skole_id: $skole_id
        klassetrinn: $klassetrinn
        adresse: $adresse
        fornavn: $fornavn
        mellomnavn: $mellomnavn
        etternavn: $etternavn
        postnummer: $postnummer
      }
    ) {
      ${BEBOER}
    }
  }
`;

export const LAG_BEBOER = gql`
  mutation LagBeboer(

      $fornavn: String!
      $mellomnavn: String
      $etternavn: String!
      $epost: String!
      $telefon: String
      $fodselsdato: String
      $studie_id: Int!
      $skole_id: Int!
      $adresse: String
      $klassetrinn: Int!
      $alkoholdepositum: Boolean!
      $rolle_id: Int!
      $rom_id: Int!
      $kjonn: Boolean!
  ) {
    lagBeboer(
      data: {
        fornavn: $fornavn
        mellomnavn: $mellomnavn
        etternavn: $etternavn
        epost: $epost
        telefon: $telefon
        fodselsdato: $fodselsdato
        studie_id: $studie_id
        skole_id: $skole_id
        adresse: $adresse
        klassetrinn: $klassetrinn
        alkoholdepositum: $alkoholdepositum
        rolle_id: $rolle_id
        rom_id: $rom_id
        kjonn: $kjonn
      }
      
    ) {
      ${BEBOER}
    }
  }

`;

export const FLYTT_BEBOER = gql`
  mutation FlyttBeboer(
    $id: Int!
    $romId: Int!
    $utflytt: String!
    $innflytt: String!
  ) {
    flyttBeboer(id: $id, romId: $romId, utflytt: $utflytt, innflytt: $innflytt) {
      ${BEBOER}

    }
  }
`;

export const UPDATE_BEBOER_ADMIN = gql`
  mutation OppdatertBeboerAdmin(
    $id: Int!
    $depositum: Boolean!
    $rolleId: Int!
    $kundenr: Int
    $romId: Int!
  ) {
    oppdaterBeboerAdmin(
      id: $id
      depositum: $depositum
      rolleId: $rolleId
      kundenr: $kundenr
      romId: $romId
    ) {
      ${BEBOER}
    }
  }
`;

export const GET_BEBOER_PREFS = gql`
  query GetPrefs($beboerId: Int!) {
    hentPrefs(beboerId: $beboerId) {
      beboerId
      pinboo
      pinkode
      resepp
      vinkjeller
      vinpin
    }
  }
`;

export const UPDATE_PREFS = gql`
  mutation OppdaterPrefs(
    $id: Int!
    $pinboo: Boolean!
    $pinkode: Int
    $resepp: Boolean!
    $vinkjeller: Boolean!
    $vinpin: Int
  ) {
    oppdaterPrefs(
      id: $id
      prefs: {
        pinboo: $pinboo
        pinkode: $pinkode
        resepp: $resepp
        vinkjeller: $vinkjeller
        vinpin: $vinpin
      }
    ) {
      beboerId
      pinboo
      pinkode
      resepp
      vinkjeller
      vinpin
    }
  }
`;

export const GET_BEBOERE = gql`
  query GetBeboere {
    hentBeboere {
      ${BEBOER}
    }
  }
`;

export const GET_GAMLE_BEBOERE = gql`
  query GetGamleBeboere {
    hentGamleBeboere {
      ${BEBOER}
    }
  }
`;

export const GET_PERMLISTE = gql`
  query GetPermliste {
    hentBeboerePerm {
      ${BEBOER}
    }
  }

`;

export const GET_BEBOER_EPOST_PREFS = gql`
  query GetEpostPrefs($id: Int!) {
    hentEpostPrefs(beboerId: $id) {
      beboer_id
      tildelt
      snart_vakt
      bytte
      utleie
      barvakt
    }
  }
`;

export const UPDATE_BEBOER_EPOST_PREFS = gql`
  mutation OppdaterEpostPrefs(
    $id: Int!
    $tildelt: Boolean!
    $snartVakt: Boolean!
    $bytte: Boolean!
    $utleie: Boolean!
    $barvakt: Boolean!
  ) {
    oppdaterEpostPrefs(
      id: $id
      prefs: {
        tildelt: $tildelt
        snartVakt: $snartVakt
        bytte: $bytte
        utleie: $utleie
        barvakt: $barvakt
      }
    ) {
      beboerId
      tildelt
      snartVakt
      bytte
      utleie
      barvakt
    }
  }
`;

export const UPDATE_BEBOERE_ANSIENNITET = gql`
  mutation OppdaterAnsiennitet(
    $data: [AnsiennitetBeboer!]!
  ) {
    oppdaterAnsiennitet(
      data: $data
    ) {
      ${BEBOER}
    }
  }
`;

export const SLETT_BEBOER = gql`
  mutation SlettBeboer($id: Int!) {
    slettBeboer(id: $id) {
      ${BEBOER}
    }
  }
`;

export const UPDATE_BEBOER_PERM = gql`
  mutation OppdaterPermStatus($id: Int!, $perm: Int!) {
    oppdaterPermStatus(id: $id, perm: $perm) {
      ${BEBOER}
    }
  }
`;
