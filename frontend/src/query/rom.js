import { gql } from "@apollo/client";

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
