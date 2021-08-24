const formaterDato = (dato) => {
  const datoArray = dato.split("-");
  return datoArray[2] + "/" + datoArray[1] + "/" + datoArray[0];
};

export default formaterDato;
