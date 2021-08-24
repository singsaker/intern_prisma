import { gql } from "apollo-boost";

export const GET_VERV = gql`
  query GetVerv {
    hentVerv {
      id
      navn
      regitimer
      utvalg
      beskrivelse
      aapmend
      epost
    }
  }
`;
