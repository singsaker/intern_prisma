import { gql } from "@apollo/client";

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
