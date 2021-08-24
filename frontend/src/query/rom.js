import { gql } from "apollo-boost";

const STORHYBELLISTE = `
      id
      semester
      navn
      aktiv
      velger
      rom
      rekkefolge {
        nummer
        beboer {
          id
          fornavn
          mellomnavn
          etternavn
          ansiennitet
          klassetrinn
        }
      }
      valg {
        beboer {
          id
          fornavn
          mellomnavn
          etternavn
          ansiennitet
          klassetrinn
        }
        gammeltRom
        nyttRom
      }
`;

export const GET_ALLE_ROM = gql`
  query GetAlleRom {
    hentAlleRom {
      id
      navn
      romtype {
        id
        navn
      }
    }
  }
`;

export const GET_ALLE_STORHYBELLISTER = gql`
  query GetAlleStorhybellister {
    hentStorhybellister {
      ${STORHYBELLISTE}
    }
  }
`;

export const LAG_STORHYBELLISTE = gql`
  mutation LagStorhybelliste(
    $navn: String!
    $semester: String!
    $beboere: [Int!]
    $rom: [Int!]
  ) {
    lagStorhybelliste(
      navn: $navn
      semester: $semester
      beboere: $beboere
      rom: $rom
    ) {
    ${STORHYBELLISTE}
    }
  }
`;
