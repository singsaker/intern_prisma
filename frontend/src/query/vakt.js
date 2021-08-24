import { gql } from "apollo-boost";
export const GET_VAKTER = gql`
  query GetVakter($fraDato: String!, $tilDato: String!, $bruker_id: Int) {
    hentVakter(fraDato: $fraDato, tilDato: $tilDato, bruker_id: $bruker_id) {
      id
      autogenerert
      bekreftet
      bytte
      dato
      dobbelvakt
      straffevakt
      vaktbytte_id
      vakttype
    }
  }
`;
