const formaterTelefon = (nummer) => {
  const telefon = nummer.toString();
  const nr =
    telefon.slice(0, 3) + " " + telefon.slice(3, 5) + " " + telefon.slice(5, 8);
  return nr;
};

export default formaterTelefon;
