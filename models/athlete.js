const pool = require("../config/db");

// 1. Haetaan kaikki urheilijat
async function getAll() {
  const rows = await pool.query("SELECT * FROM athletes ORDER BY id");

  return rows;
}

// 2. Haetaan yksi urheilija ID:n perusteella
async function getById(id) {
  const rows = await pool.query("SELECT * FROM athletes WHERE id = ?", [id]);

  return rows[0] || null;
}

// 3. Lisätään uusi urheilija
async function create(athlete) {
  const result = await pool.query(
    `INSERT INTO athletes
      (first_name, last_name, nickname, birth_date,
       weight, image_url, sport, achievements)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      athlete.first_name,
      athlete.last_name,
      athlete.nickname || null,
      athlete.birth_date || null,
      athlete.weight ?? null,
      athlete.image_url || null,
      athlete.sport,
      athlete.achievements || null,
    ],
  );

  return getById(Number(result.insertId));
}

// 4. Päivitetään urheilijan tiedot
async function update(id, athlete) {
  const result = await pool.query(
    `UPDATE athletes SET
       first_name = ?,
       last_name = ?,
       nickname = ?,
       birth_date = ?,
       weight = ?,
       image_url = ?,
       sport = ?,
       achievements = ?
     WHERE id = ?`,
    [
      athlete.first_name,
      athlete.last_name,
      athlete.nickname || null,
      athlete.birth_date || null,
      athlete.weight ?? null,
      athlete.image_url || null,
      athlete.sport,
      athlete.achievements || null,
      id,
    ],
  );

  if (Number(result.affectedRows) === 0) {
    return null;
  }

  return getById(id);
}

// 5. Poistetaan urheilija
async function remove(id) {
  const result = await pool.query("DELETE FROM athletes WHERE id = ?", [id]);

  return Number(result.affectedRows) > 0;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
