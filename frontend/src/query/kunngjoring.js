import { gql } from "apollo-boost";

export const GET_KUNNGJORNGER = gql`
  query GetKunngjoringer {
    hentKunngjoringer {
      id
      publisert
      tekst
      tittel
      beboer {
        fornavn
        mellomnavn
        etternavn
      }
    }
  }
`;
