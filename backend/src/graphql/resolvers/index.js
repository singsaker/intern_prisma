const { authMutation, authQuery } = require("./auth");
const { beboerQuery, beboerMutation } = require("./beboer");
const { kryssQuery, kryssMutation } = require("./kryss");
const { vervQuery } = require("./verv");
const { vaktQuery, vaktMutation } = require("./vakt");
const { skoleQuery, skoleMutation } = require("./skole");
const { drikkeQuery, drikkeMutation } = require("./drikke");
const { kunngjoringMutation, kunngjoringQuery } = require("./kunngjoring");
const { pinkodeQuery, pinkodeMutation } = require("./pinkode");
const { regiQuery, regiMutation } = require("./regi");
const { romQuery, romMutation } = require("./rom");
const { soknadQuery } = require("./soknad");
const {
  storhybellisteQuery,
  storhybellisteMutation,
} = require("./storhybelliste");
const { rettigheterMutation, rettigheterQuery } = require("./rettigheter");

const resolver = {
  Mutation: {
    ...authMutation,
    ...beboerMutation,
    ...drikkeMutation,
    ...kunngjoringMutation,
    ...kryssMutation,
    ...regiMutation,
    ...vaktMutation,
    ...pinkodeMutation,
    ...skoleMutation,
    ...romMutation,
    ...rettigheterMutation,
    ...storhybellisteMutation,
  },
  Query: {
    ...authQuery,
    ...beboerQuery,
    ...drikkeQuery,
    ...kunngjoringQuery,
    ...kryssQuery,
    ...pinkodeQuery,
    ...skoleQuery,
    ...vaktQuery,
    ...vervQuery,
    ...regiQuery,
    ...rettigheterQuery,
    ...romQuery,
    ...soknadQuery,
    ...storhybellisteQuery,
  },
};

module.exports = resolver;
