// Finner ukenummeret til den nåverende datoen:
export default () => {
  let date = new Date();
  const dagNr = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dagNr);
  const aarStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const ukeNr = Math.ceil(((date - aarStart) / 86400000 + 1) / 7);
  return ukeNr - 1;
};
