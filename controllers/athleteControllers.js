const Athlete = require("../models/athlete");

// GET: haetaan kaikki urheilijat
async function getAll(req, res) {
  try {
    const athletes = await Athlete.getAll();
    res.status(200).json(athletes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Urheilijoiden hakeminen epäonnistui",
    });
  }
}

// GET: haetaan yksi urheilija
async function getById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Virheellinen urheilijan ID",
      });
    }

    const athlete = await Athlete.getById(id);

    if (!athlete) {
      return res.status(404).json({
        message: "Urheilijaa ei löytynyt",
      });
    }

    res.status(200).json(athlete);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Urheilijan hakeminen epäonnistui",
    });
  }
}

// POST: lisätään urheilija
async function create(req, res) {
  try {
    const {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    } = req.body;

    if (
      typeof first_name !== "string" ||
      !first_name.trim() ||
      typeof last_name !== "string" ||
      !last_name.trim() ||
      typeof sport !== "string" ||
      !sport.trim()
    ) {
      return res.status(400).json({
        message: "Etunimi, sukunimi ja laji ovat pakollisia",
      });
    }

    const athlete = await Athlete.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      nickname,
      birth_date,
      weight,
      image_url,
      sport: sport.trim(),
      achievements,
    });

    res.status(201).json(athlete);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Urheilijan lisääminen epäonnistui",
    });
  }
}

// PUT: päivitetään urheilija
async function update(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Virheellinen urheilijan ID",
      });
    }

    const {
      first_name,
      last_name,
      nickname,
      birth_date,
      weight,
      image_url,
      sport,
      achievements,
    } = req.body;

    if (
      typeof first_name !== "string" ||
      !first_name.trim() ||
      typeof last_name !== "string" ||
      !last_name.trim() ||
      typeof sport !== "string" ||
      !sport.trim()
    ) {
      return res.status(400).json({
        message: "Etunimi, sukunimi ja laji ovat pakollisia",
      });
    }

    const athlete = await Athlete.update(id, {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      nickname,
      birth_date,
      weight,
      image_url,
      sport: sport.trim(),
      achievements,
    });

    if (!athlete) {
      return res.status(404).json({
        message: "Urheilijaa ei löytynyt",
      });
    }

    res.status(200).json(athlete);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Urheilijan päivittäminen epäonnistui",
    });
  }
}

// DELETE: poistetaan urheilija
async function remove(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Virheellinen urheilijan ID",
      });
    }

    const deleted = await Athlete.remove(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Urheilijaa ei löytynyt",
      });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Urheilijan poistaminen epäonnistui",
    });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
