import { gql } from "apollo-boost";

export const GET_STUDIER = gql`
  query GetStudie {
    hentStudie {
      id
      navn
    }
  }
`;

export const GET_SKOLE = gql`
  query GetSkole {
    hentSkole {
      id
      navn
    }
  }
`;

export const LAG_STUDIE = gql`
  mutation LagStudie($navn: String!) {
    lagStudie(navn: $navn) {
      id
      navn
    }
  }
`;

export const OPPDATER_STUDIE = gql`
  mutation OppdaterStudie($id: Int!, $navn: String!) {
    oppdaterStudie(id: $id, navn: $navn) {
      id
      navn
    }
  }
`;

export const SLETT_STUDIE = gql`
  mutation SlettStudie($id: Int!) {
    slettStudie(id: $id) {
      id
    }
  }
`;
