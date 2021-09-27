// På denne siden ligger alle "typer" actions
// Disse settes på de ulike actionsa - når reducerne får tilsendt en action
// kan den sjekke type-feltet med en switch/case for å se om den skal gjøre noe med payloaden/dataen eller ikke

// Auth
export const ER_INNLOGGET_TYPE = "ER_INNLOGGET";
export const LOGG_INN_TYPE = "LOGG_INN";
export const LOGG_UT_TYPE = "LOGG_UT";

// Beboer
export const GET_BEBOERE_TYPE = "GET_BEBOERE";
export const GET_NOEN_BEBOERE_TYPE = "GET_NOEN_BEBOERE";
export const GET_BEBOER_TYPE = "GET_BEBOER";
export const GET_BEBOER_PREFS_TYPE = "GET_BEBOER_PREFS";
export const GET_BEBOER_EPOST_PREFS_TYPE = "GET_BEBOER_EPOST_PREFS";
export const OPPDATER_BEBOER_EPOST_PREFS_TYPE = "GET_BEBOER_EPOST_PREFS";
export const OPPDATER_BEBOER_PREFS_TYPE = "OPPDATER_BEBOER_PREFS";
export const GET_GAMLE_BEBOERE_TYPE = "GET_GAMLE_BEBOERE";
export const GET_GAMMEL_BEBOER_TYPE = "GET_GAMMEL_BEBOER";
export const SLETT_BEBOER_TYPE = "SLETT_BEBOER";
export const SEND_PAA_PERM_TYPE = "SEND_PAA_PERM";
export const SEND_HJEM_FRA_PERM_TYPE = "SEND_HJEM_FRA_PERM";
export const GET_PERMLISTE_TYPE = "GET_PERMLISTE";

// Beskjed
export const GET_KUNNGJORINGER_TYPE = "GET_KUNNGJORINGER";

// Drikke
export const GET_DRIKKER_TYPE = "GET_DRIKKER";
export const GET_DRIKKE_TYPE = "GET_DRIKKE";

// Info
export const GET_VERV_TYPE = "GET_VERV";
export const GET_SKOLE_TYPE = "GET_SKOLE";
export const GET_STUDIER_TYPE = "GET_STUDIER";
export const GET_STUDIE_TYPE = "GET_STUDIE";
export const SLETT_STUDIE_TYPE = "SLETT_STUDIE";

// Kryss
export const GET_KRYSS_TYPE = "GET_KRYSS";
export const GET_KRYSSELISTE_TYPE = "GET_KRYSSELISTE";
export const GET_AKTIV_VIN_TYPE = "GET_AKTIV_VIN";
export const GET_AKTIV_DRIKKE_TYPE = "GET_AKTIV_DRIKKE";

// Regi
export const GET_ARBEIDSKATEGORIER_TYPE = "GET_ARBEIDSKATEGORIER";
export const GET_ARBEID_TYPE = "GET_ARBEID";
export const GET_REGISTATUS_TYPE = "GET_REGISTATUS_TYPE";
export const GET_ROLLER_TYPE = "GET_ROLLER";

// Rom
export const GET_ALLE_ROM_TYPE = "GET_ALLE_ROM";
export const GET_ALLE_STORHYBELLISTER_TYPE = "GET_ALLE_STORHYBELLISTER";
export const GET_STORHYBELLISTE_TYPE = "GET_STORHYBELLISTE";
export const SLETT_STORHYBELLISTE_TYPE = "SLETT_STORHYBELLISTE";

// Soknad
export const GET_NOEN_SOKNADER_TYPE = "GET_NOEN_SOKNADER";
export const GET_SOKNAD_TYPE = "GET_SOKNAD";

// Vakt
export const GET_VAKTER_TYPE = "GET_VAKTER";
