const pool = require("./config/db");

async function testConnection() {
  let conn;

  try {
    conn = await pool.getConnection();

    console.log("MariaDB-yhteys toimii!");

    const result = await conn.query("SELECT DATABASE() AS tietokanta");

    console.log("Käytössä oleva tietokanta:", result[0].tietokanta);

    const rows = await conn.query("SELECT COUNT(*) AS maara FROM athletes");

    console.log("Urheilijoita tietokannassa:", rows[0].maara);
  } catch (error) {
    console.error("Tietokantayhteys epäonnistui:", error.message);
  } finally {
    if (conn) {
      conn.release();
    }

    await pool.end();
  }
}

testConnection();
