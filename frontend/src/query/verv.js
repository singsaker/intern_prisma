import { gql } from "@apollo/client";

const VERV = `
    beboer_id
    verv_id
`;

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

export const LEGG_TIL_VERV = gql`
  mutation LeggTilVerv(
      $beboer_id: Int!
      $verv_id: Int!
  ) {
    leggTilVerv(
      data: {
        $beboer_id: Int!
        $verv_id: Int!
      }
      
    )
  }

`;