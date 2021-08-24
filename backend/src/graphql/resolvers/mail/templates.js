const resettPassordTemplate = (beboer, url) => {
  const from = "kevinnor1997@gmail.com";
  const to = beboer.epost;
  const subject = "🌻 Singsaker Internside | Resett passord 🌻";
  const html = `
    <p>Hei ${beboer.fornavn},</p>
    <p>Synd at du har mistet passordet ditt til internsiden</p>
    <p>Frykt ikke! Du kan bruke den følgende lenken til å resette passordet ditt:</p>
    <a href=${url}>Trykk her!</a>
    <p>Lenken utløper om 1 time</p>
    <p>Mvh dine kjære dataåpmend <3</p>
    `;
  return { from, to, subject, html };
};

const passordResattTemplate = (mottaker) => {
  const from = "kevinnor1997@gmail.com";
  const to = mottaker;
  const subject = "🌻 Singsaker Internside | Passord er resatt 🌻";
  const html = `
    <p>Passordet tilhørende ${mottaker} er resatt på Singsaker Internside</p>
    <p>Dersom dette ikke var deg, ta kontakt med DGS</p>
    `;
  return { from, to, subject, html };
};

module.exports = { resettPassordTemplate, passordResattTemplate };
