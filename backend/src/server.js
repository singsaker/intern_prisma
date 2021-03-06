const express = require("express");
const typeDefs = require("./graphql/schema/schema");
const resolvers = require("./graphql/resolvers/index");
const { createContext } = require("./context");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
require("dotenv").config();

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
  });

  const corsOptions = {
    origin: function (origin, callback) {
      if (process.env.ENVIORNMENT === "dev") {
        callback(null, true);
      } else {
        callback("http://localhost:3000");
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Helmet legger til en del enkel sikkerhet:
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  app.use(cookieParser());
  app.use((req, res, next) => {
    // ser etter bruker i cookie og legger til brukerId i "request"
    const { TokenCookie } = req.cookies;

    if (TokenCookie) {
      const { bruker_id, beboer_id } = jwt.verify(
        TokenCookie,
        process.env.APP_SECRET
      );
      req.brukerId = bruker_id;
      req.beboerId = beboer_id;
    } else if (process.env.ENVIORNMENT === "dev") {
      //  Kun for utvikling!
      //  Setter bruker_id og beboer_id tilsvarende beboeren "Kevin Nordnes":
      req.brukerId = 709;
      req.beboerId = 742;
    } else {
      throw new AuthenticationError("Brukeren må være logget inn!");
    }
    next();
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
    cors: false, // disables the apollo-server-express cors to allow the cors middleware use
  });

  await app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000`)
  );
}

startApolloServer();
