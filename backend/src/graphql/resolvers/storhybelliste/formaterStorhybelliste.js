module.exports = async (storhybel) => {
  try {
    return {
      ...storhybel,
      rom: storhybel.storhybel_rom.map((r) => r.rom_id),
      rekkefolge: storhybel.storhybel_rekkefolge.map((obj) => {
        return { beboer: obj.storhybel_velger.beboer, nummer: obj.nummer };
      }),
      valg: storhybel.storhybel_fordeling.map((ford) => {
        return {
          beboer: ford.storhybel_velger.beboer,
          gammeltRom: ford.gammel_rom_id,
          nyttRom: ford.ny_rom_id,
        };
      }),
    };
  } catch (err) {
    throw err;
  }
};
