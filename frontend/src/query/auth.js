import { gql } from "apollo-boost";

export const ER_INNLOGGET = gql`
  query ErInnlogget {
    sjekkToken {
      bruker_id
      beboer_id
      tilgang {
        data
        helga
        kjellermester
        utvalget
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($epost: String!, $passord: String!) {
    login(epost: $epost, passord: $passord) {
      token
      tokenExpiration
      bruker_id
      beboer_id
      tilgang {
        utvalget
        kjellermester
        helga
        data
      }
    }
  }
`;

export const ENDRE_PASSORD = gql`
  mutation EndrePassord($id: Int!, $nyttPassord: String!) {
    oppdaterPassord(id: $id, nyttPassord: $nyttPassord) {
      id
    }
  }
`;

export const GLEMT_PASSORD = gql`
  query GlemtPassord($epost: String!) {
    glemtPassord(epost: $epost)
  }
`;

export const RESETT_GLEMT_PASSORD = gql`
  mutation ResettPassord($brukerId: Int!, $token: String!, $passord: String!) {
    resettGlemtPassord(brukerId: $brukerId, token: $token, passord: $passord)
  }
`;
