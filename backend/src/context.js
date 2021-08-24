const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

function createContext(request, response) {
  return { prisma, ...request, ...response };
}

module.exports = {
  createContext,
};
