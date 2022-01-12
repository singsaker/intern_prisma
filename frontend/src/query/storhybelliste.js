import { gql } from "@apollo/client";

const STORHYBELLISTE = `
    id
    navn
    velger {
        plass
        beboer {
            id
            fornavn
            mellomnavn
            etternavn
            ansiennitet
            klassetrinn
        }
        gammelt_rom {
            id
            navn
            romtype {
            navn
            }
        }
        nytt_rom {
            id
            navn
            romtype {
                navn
            }
        }
    }
    velging_start
    paamelding_start
    status
    rom {
        id
        navn
        romtype {
            navn
        }
    }
    lagd
`;

export const LAG_STORHYBELLISTE = gql`
  mutation LagStorhybelliste($navn: String!, $paameldingStart: String, $velgingStart: String) {
    lagStorhybelliste(navn: $navn, paamelding_start: $paameldingStart, velging_start: $velgingStart) {
      ${STORHYBELLISTE}
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
