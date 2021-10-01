import { gql } from "@apollo/client";

export const GET_ARBEIDSKATEGORIER = gql`
  query GetArbeidskategorier {
    hentArbeidskategorier {
      id
      navn
      tid_oppretta
      beskrivelse
    }
  }
`;

export const GET_ARBEID = gql`
  query GetArbeid($brukerId: Int, $semester: String, $aar: Int) {
    hentArbeid(brukerId: $brukerId, semester: $semester, aar: $aar) {
      id
      bruker {
        id
        beboer {
          id
          fornavn
          mellomnavn
          etternavn
        }
      }
      godkjent
      godkjent_av_bruker {
        beboer {
          id
          fornavn
          mellomnavn
          etternavn
        }
      }
      kommentar
      polymorfkategori_id
      polymorfkategori_velger
      sekunder_brukt
      tid_godkjent
      tid_registrert
      tid_utfort
      tilbakemelding
    }
  }
`;

export const GET_REGISTATUS = gql`
  query GetRegistatus($brukerId: Int!, $semester: String!, $aar: Int!) {
    hentRegiStatus(brukerId: $brukerId, semester: $semester, aar: $aar) {
      semester
      godkjent
      behandling
      underkjent
      gjenvaerende
      totalt
    }
  }
`;

export const GET_ROLLER = gql`
  query GetRoller {
    hentRoller {
      id
      navn
      regitimer
      vakter_h
      vakter_v
    }
  }
`;
