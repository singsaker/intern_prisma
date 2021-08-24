const formaterDatoOgKlokke = (tid) => {
  const dato = new Date(tid);
  const formatertDato =
    (dato.getDate() < 10 ? "0" + dato.getDate() : dato.getDate()) +
    "/" +
    ((dato.getMonth() < 9 ? "0" + (dato.getMonth() + 1) : dato.getMonth() + 1) +
      "/" +
      dato.getFullYear());
  const klokka =
    (dato.getHours() < 10 ? "0" + dato.getHours() : dato.getHours()) +
    ":" +
    (dato.getMinutes() < 10 ? "0" + dato.getMinutes() : dato.getMinutes());

  return { dato: formatertDato, klokkeslett: klokka };
};

export default formaterDatoOgKlokke;
