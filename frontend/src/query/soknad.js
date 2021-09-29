import { gql } from "@apollo/client";

const SOKNAD = `
      id
      innsendt
      navn
      adresse
      epost
      telefon
      fodselsar
      skole
      studie
      fagbrev
      kompetanse
      kjennskap
      kjenner
      tekst
      bilde
  `;

export const GET_SOKNADER_SEMESTER = gql`
  query GetSoknaderSemester($aar: Int!, $semester: String!) {
    hentSoknaderSemester(aar: $aar, semester: $semester) {
      ${SOKNAD}
    }
  }
`;

export const GET_SOKNAD = gql`
  query GetSoknad($id: Int!) {
    hentSoknad(id: $id) {
      ${SOKNAD}
    }
  }
`;
