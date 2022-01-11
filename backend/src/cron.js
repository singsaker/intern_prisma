const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const cronjob = async () => {
  //   cron.schedule("*/5 * * * * *", async function () {
  //     try {
  //       const beboer = await prisma.beboer.findUnique({
  //         where: {
  //           id: 742,
  //         },
  //         select: {
  //           fornavn: true,
  //         },
  //       });
  //       console.log(beboer);
  //     } catch (err) {
  //       throw err;
  //     }
  //   });
};

module.exports = cronjob;
