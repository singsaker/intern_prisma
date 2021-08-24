const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (bruker_id, fornavn, beboer_id) => {
  const expiration = process.env.DB_ENV === "testing" ? 10000 : 604800000;
  const token = jwt.sign(
    { bruker_id, fornavn, beboer_id },
    process.env.APP_SECRET,
    {
      expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
    }
  );
  return { token, expiration };
};
module.exports = generateToken;
