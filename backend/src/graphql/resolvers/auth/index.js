const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const generateToken = require("./generateToken");
const { genererPassordResettToken } = require("./genererPassordResettToken");
const {
  resettPassordTemplate,
  passordResattTemplate,
} = require("../mail/templates");
const { sendMail } = require("../mail/sendMail");

dotenv.config();

const sjekkTilgang = (verv) => {
  let utvalget = false;
  let kjellermester = false;
  let helga = false;
  let data = false;

  // Går igjennom hvert verv og ser om det gir noen tilgang:
  verv.map((verv_obj) => {
    const verv_id = verv_obj.verv.id;

    if (verv_id === 44 || verv_id === 43) {
      data = true;
    } else if (verv_id === 45) {
      kjellermester = true;
    }
    if (verv_obj.verv.utvalg) {
      utvalget = true;
    }
  });

  return { utvalget, kjellermester, helga, data };
};

const authQuery = {
  sjekkToken: async (parent, args, context) => {
    try {
      const TokenCookie = context.req.cookies.TokenCookie;

      if (TokenCookie) {
        const decoded = jwt.verify(TokenCookie, process.env.APP_SECRET);

        if (decoded) {
          const beboer = await context.prisma.beboer.findMany({
            where: {
              bruker_id: decoded.bruker_id,
            },
            include: {
              beboer_verv: {
                include: {
                  verv: true,
                },
              },
            },
          });

          const tilgang = sjekkTilgang(beboer[0].beboer_verv);

          return {
            token: TokenCookie,
            tokenExpiration: decoded.exp,
            bruker_id: decoded.bruker_id,
            beboer_id: decoded.beboer_id,
            tilgang: tilgang,
          };
        }
      }
      return null;
    } catch (err) {
      throw err;
    }
  },
  glemtPassord: async (parent, args, context) => {
    try {
      // Henter inn beboer
      const beboer = await context.prisma.beboer.findMany({
        where: {
          epost: args.epost,
        },
        select: {
          fornavn: true,
          etternavn: true,
          epost: true,
          bruker: {
            select: {
              id: true,
              passord: true,
              dato: true,
            },
          },
        },
      });

      if (beboer[0]) {
        const { passord, id, dato } = beboer[0].bruker;
        const token = genererPassordResettToken(passord, id, dato);

        await context.prisma.bruker.update({
          where: {
            id: id,
          },
          data: {
            glemt_token: token,
          },
        });

        const url = `http://localhost:3000/glemtpassord/${beboer[0].bruker.id}/${token}`;
        const emailTemplate = resettPassordTemplate(beboer[0], url);

        sendMail(emailTemplate);
      }
      return;
    } catch (err) {
      throw err;
    }
  },
};

const authMutation = {
  login: async (parent, args, context) => {
    try {
      // Henter beboer som er registrert med gitt epost:
      const beboer = await context.prisma.beboer.findMany({
        where: {
          epost: args.epost,
        },
        include: {
          // Inkluderer bruker for passord og verv for å sjekke tilgang:
          bruker: true,
          romhistorikk: true,
          beboer_verv: {
            include: {
              verv: true,
            },
          },
        },
      });

      if (
        beboer[0].romhistorikk[beboer[0].romhistorikk.length - 1].utflyttet !==
        null
      ) {
        return null;
      }

      if (!beboer) return null;

      // Sjekker gitt passord opp mot passord i db:
      const godkjent = await bcrypt.compare(
        args.passord,
        beboer[0].bruker.passord
      );

      if (!godkjent) return null;

      // Lager en token:
      const { token, expiration } = generateToken(
        beboer[0].bruker_id,
        beboer[0].fornavn,
        beboer[0].id
      );

      return {
        token,
        tokenExpiration: expiration,
        bruker_id: beboer[0].bruker_id,
        beboer_id: beboer[0].id,
        tilgang: sjekkTilgang(beboer[0].beboer_verv),
      };
    } catch (err) {
      throw err;
    }
  },
  oppdaterPassord: async (parent, args, context) => {
    try {
      const SALT_ROUNDS = 10;

      // Bruker bcrypt til å genere et salt, lage en hash med saltet og passordet, oppdaterer så db:
      // Funksjonen returnerer bruke
      return await bcrypt
        .genSalt(SALT_ROUNDS)
        .then((salt) => {
          return bcrypt.hash(args.nyttPassord, salt);
        })
        .then((hash) => {
          return context.prisma.bruker.update({
            where: {
              id: args.id,
            },
            data: {
              salt: hash.slice(0, 29),
              passord: hash,
            },
            // Viktig å ikke ta med passord og salt, det er fy fy!
            select: {
              dato: true,
              glemt_token: true,
              id: true,
              beboer: true,
            },
          });
        })
        .catch((err) => console.error(err.message));
    } catch (err) {
      throw err;
    }
  },

  resettGlemtPassord: async (parent, args, context) => {
    try {
      const SALT_ROUNDS = 10;
      const bruker = await context.prisma.bruker.findOne({
        where: {
          id: args.brukerId,
        },
        select: {
          id: true,
          dato: true,
          passord: true,
          beboer: {
            select: {
              epost: true,
            },
          },
        },
      });

      const secret = bruker.passord + "-" + bruker.dato;
      const payload = jwt.decode(args.token, secret);

      if (payload == bruker.id) {
        const hash = await bcrypt
          .genSalt(SALT_ROUNDS)
          .then((salt) => {
            return bcrypt.hash(args.passord, salt);
          })
          .catch((err) => console.error(err.message));
        await context.prisma.bruker.update({
          where: {
            id: args.brukerId,
          },
          data: {
            salt: hash.slice(0, 29),
            passord: hash,
            dato: new Date(),
          },
          // Viktig å ikke ta med passord og salt, det er fy fy!
          select: {
            dato: true,
            glemt_token: true,
            id: true,
            beboer: true,
          },
        });
        sendMail(passordResattTemplate(bruker.beboer.epost));
      }
      return "Sjekk mailinnboksen din for bekreftelse!";
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { authQuery, authMutation };
