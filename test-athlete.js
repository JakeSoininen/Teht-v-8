const Athlete = require("./models/athlete");

async function testAthlete() {
  try {
    const athletes = await Athlete.getAll();

    console.log("Tietokantakysely toimii!");
    console.log("Urheilijoiden määrä:", athletes.length);
    console.log(athletes);
  } catch (error) {
    console.error("Mallin testi epäonnistui:", error.message);
  } finally {
    process.exit();
  }
}

testAthlete();
