import { gql } from "apollo-boost";

export const GET_AKTIV_VIN = gql`
  query GetAktivVin {
    hentAktivVin {
      id
      antall
      avanse
      beskrivelse
      bilde
      land
      navn
      pris
      slettet
      type
    }
  }
`;

export const GET_AKTIV_DRIKKE = gql`
  query GetAktivDrikke {
    hentAktivDrikke {
      id
      navn
      pris
      vin
      aktiv
      farge
      kommentar
      forst
    }
  }
`;

export const GET_KRYSSEHISTORIKK = gql`
  query GetKrysseliste($beboerId: Int!) {
    hentKrysseliste(beboerId: $beboerId) {
      id
      drikke {
        id
        navn
        pris
      }
      krysseliste {
        tid
        antall
      }
    }
  }
`;
