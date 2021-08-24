const jwt = require("jsonwebtoken");

const genererPassordResettToken = (passord, brukerId, datoGenerert) => {
  const secret = passord + "-" + datoGenerert;
  const token = jwt.sign(brukerId, secret);

  return token;
};

module.exports = { genererPassordResettToken };
