const { authMutation, authQuery } = require("./auth");
const { beboerQuery, beboerMutation } = require("./beboer");
const { kryssQuery, kryssMutation } = require("./kryss");
const { vervQuery } = require("./verv");
const { vaktQuery, vaktMutation } = require("./vakt");
const { skoleQuery, skoleMutation } = require("./skole");
const { drikkeQuery, drikkeMutation } = require("./drikke");
const { kunngjoringMutation, kunngjoringQuery } = require("./kunngjoring");
const { regiQuery, regiMutation } = require("./regi");
const { romQuery, romMutation } = require("./rom");
const { soknadQuery } = require("./soknad");
const {
  storhybellisteQuery,
  storhybellisteMutation,
} = require("./storhybelliste");

const resolver = {
  Mutation: {
    ...authMutation,
    ...beboerMutation,
    ...drikkeMutation,
    ...kunngjoringMutation,
    ...kryssMutation,
    ...regiMutation,
    ...vaktMutation,
    ...skoleMutation,
    ...romMutation,
    ...storhybellisteMutation,
  },
  Query: {
    ...authQuery,
    ...beboerQuery,
    ...drikkeQuery,
    ...kunngjoringQuery,
    ...kryssQuery,
    ...skoleQuery,
    ...vaktQuery,
    ...vervQuery,
    ...regiQuery,
    ...romQuery,
    ...soknadQuery,
    ...storhybellisteQuery,
  },
};

module.exports = resolver;
