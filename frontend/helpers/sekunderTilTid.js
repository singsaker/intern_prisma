const sekunderTilTid = (sekunder) => {
  // Regner ut timer og minutter som er brukt på arbeidet:
  let sec = parseInt(sekunder);
  let hours = Math.floor(sec / 3600);
  sec %= 3600;
  let minutes = Math.floor(sec / 60);
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");

  return { hours, minutes, sec };
};
export default sekunderTilTid;
