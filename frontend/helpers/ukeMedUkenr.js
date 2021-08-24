// Bruker ukenummeret til å finne datoen til den første og siste dagen i uken:
// Finnes nok en mye bedre måte å gjøre dette på...
export default (ukeNr) => {
  let date = new Date();
  const aarStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  let fraDato = new Date(aarStart.getTime() + 604800000 * ukeNr);
  let tilDato = new Date();

  fraDato.setTime(
    fraDato.getTime() -
      86400000 * (fraDato.getUTCDay() !== 0 ? fraDato.getUTCDay() - 1 : 6)
  );
  fraDato.setHours(0);
  fraDato.setMinutes(0);
  fraDato.setSeconds(0);
  fraDato.setMilliseconds(0);
  tilDato.setTime(fraDato.getTime() + 86400000 * 7);

  return { fraDato, tilDato };
};
