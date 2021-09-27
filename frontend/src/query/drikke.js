import { gql } from "apollo-boost";

const DRIKKE = `
    id
    navn
    pris
    vin
    aktiv
    farge
    kommentar
    forst
    produktnr
`;

export const GET_DRIKKER = gql`
    query GetDrikker {
        hentDrikke {
            ${DRIKKE}
        }
    }
`;

export const LAG_DRIKKE = gql`
    mutation LagDrikke($navn: String!, $pris: Float!, $aktiv: Boolean!, $farge: String!, $kommentar: String, $produktnr: Int, $vin: Boolean!) {
        lagDrikke(navn: $navn, pris: $pris, aktiv: $aktiv, farge: $farge, kommentar: $kommentar, produktnr: $produktnr, vin: $vin) {
            ${DRIKKE}
        }
    }
`;

export const OPPDATER_DRIKKE = gql`
    mutation OppdaterDrikke($id: Int!, $navn: String!, $pris: Float!, $aktiv: Boolean!, $farge: String!, $kommentar: String, $produktnr: Int, $vin: Boolean!) {
        oppdaterDrikke(id: $id, navn: $navn, pris: $pris, aktiv: $aktiv, farge: $farge, kommentar: $kommentar, produktnr: $produktnr, vin: $vin) {
            ${DRIKKE}
        }
    }
`;
