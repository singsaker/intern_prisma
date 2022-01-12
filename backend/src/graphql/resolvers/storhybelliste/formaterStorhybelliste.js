module.exports = async (liste) => {
  try {
    return {
      ...liste,
      paamelding_start:
        liste.paamelding_start &&
        liste.paamelding_start.toISOString().replace(/"/g, ""),
      velging_start:
        liste.velging_start &&
        liste.velging_start.toISOString().replace(/"/g, ""),
      lagd: liste.lagd && liste.lagd.toISOString().replace(/"/g, ""),
    };
  } catch (err) {
    throw err;
  }
};
